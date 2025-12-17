import { RoleRepository } from "../repositories/role.repository";

export class RoleService {
    constructor(private repo = new RoleRepository()) { }

    findAll() {
        return this.repo.findAll();
    }

    updatePermissions(roleId: number, permissionIds: number[]) {
        return this.repo.updatePermissions(roleId, permissionIds);
    }
}
