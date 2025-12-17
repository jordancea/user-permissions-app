import { Request, Response } from "express";
import { UserService } from "../services/user.service";

const service = new UserService();

export const UserController = {
    async list(req: Request, res: Response) {
        const users = await service.findAll();
        res.json(users);
    },

    async create(req: Request, res: Response) {
        const created = await service.create(req.body);
        res.status(201).json(created);
    },

    async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        const updated = await service.update(id, req.body);
        res.json(updated);
    },

    async remove(req: Request, res: Response) {
        const id = Number(req.params.id);
        await service.delete(id);
        res.json({ success: true });
    }
};
