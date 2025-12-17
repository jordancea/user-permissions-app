import "express-session";
import { Request, Response, NextFunction } from "express";

export function adminOnly(req: Request, res: Response, next: NextFunction) {
    const user = req.session.user;
    if (!user) return res.status(401).json({ message: "Not authenticated" });
    if (user.Role?.name !== "Admin") return res.status(403).json({ message: "Admin only" });
    next();
}
