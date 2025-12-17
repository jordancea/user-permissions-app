import { Role } from "../models/role.model";
import { Permission } from "../models/permission.model";

export class RoleRepository {
    async findAll() {
        return Role.findAll({ include: [{ model: Permission, as: "Permissions" }] });
    }

    async findById(id: number) {
        return Role.findByPk(id, { include: [{ model: Permission, as: "Permissions" }] });
    }

    async updatePermissions(roleId: number, permissionIds: number[]) {
        const role = await Role.findByPk(roleId);
        if (!role) return null;
        const perms = await Permission.findAll({ where: { id: permissionIds } });
        await (role as any).setPermissions(perms);
        return this.findById(roleId);
    }
}
