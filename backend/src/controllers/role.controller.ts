import { Request, Response } from "express";
import { RoleService } from "../services/role.service";

const service = new RoleService();

export const RoleController = {
    async list(req: Request, res: Response) {
        const roles = await service.findAll();
        res.json(roles);
    },

    async updatePermissions(req: Request, res: Response) {
        const id = Number(req.params.id);
        const { permissionIds } = req.body;
        const role = await service.updatePermissions(id, permissionIds || []);
        if (!role) return res.status(404).json({ message: "Role not found" });
        res.json(role);
    }
};
