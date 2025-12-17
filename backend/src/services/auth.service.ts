import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser } from "../interfaces/user.interface";
dotenv.config();

export interface IAuthPayload {
    sub: number;
    roleId?: number;
}

export interface ILoginResult {
    token: string;
    user: IUser;
}

export class AuthService {
    constructor(private repo = new UserRepository()) {}

    async selectUserByEmail(email: string): Promise<IUser | null> {
        return this.repo.findByEmail(email);
    }

    async loginWithPassword(email: string, password: string): Promise<ILoginResult | null> {
        const user = await this.repo.findByEmail(email);
        if (!user || !user.password || !user.id) return null;
    
        const match = await bcrypt.compare(password, user.password);
        if (!match) return null;
    
        const payload: IAuthPayload = { sub: user.id, roleId: user.roleId };
        const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
    
        return { token, user };
      }
}
