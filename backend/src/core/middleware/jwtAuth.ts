import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function jwtAuth(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ message: "Missing token" });
    const token = auth.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET || "secret");
        (req as any).jwt = payload;
        next();
    } catch (e) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
