import { Request, Response, NextFunction } from "express";
import "express-session";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    sub: number;
    roleId?: number;
  };
}

export function authenticated(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.auth_token;

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "secret") as unknown as JwtPayload;

    if (!payload.sub) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    req.user = {
      sub: typeof payload.sub === "string" ? parseInt(payload.sub, 10) : payload.sub,
      roleId: payload.roleId as number | undefined,
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}