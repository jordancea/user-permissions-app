import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";
import jwt, { JwtPayload } from "jsonwebtoken";

const authService = new AuthService();
const userService = new UserService();

export const AuthController = {
  async select(req: Request, res: Response) {
    const { email } = req.body;
    const user = await authService.selectUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  },

  logout(req: Request, res: Response) {
    res.clearCookie("auth_token");
    res.json({ success: true });
  },

  async me(req: Request, res: Response) {
    const token = req.cookies?.auth_token;

    if (!token) return res.status(401).json({ message: "Not authenticated" });

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || "secret") as unknown as JwtPayload;

      if (!payload.sub) {
        return res.status(401).json({ message: "Invalid token payload" });
      }

      const userId = typeof payload.sub === "string" ? parseInt(payload.sub, 10) : payload.sub;
      const user = await userService.findById(userId);
      res.json(user);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  },

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await authService.loginWithPassword(email, password);

    if (!result) return res.status(401).json({ message: "Invalid credentials" });

    res.cookie("auth_token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
      sameSite: "lax",
    });

    res.json({ user: result.user });
  },
};
