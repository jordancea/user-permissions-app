import { Permission } from "../models/permission.model";

export class PermissionRepository {
    async findAll() {
        return Permission.findAll();
    }

    async findByKeys(keys: string[]) {
        return Permission.findAll({ where: { key: keys } });
    }

    async createMany(data: { key: string; description?: string }[]) {
        return Permission.bulkCreate(data, { ignoreDuplicates: true });
    }
}
