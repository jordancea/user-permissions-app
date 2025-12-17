import { User } from "../models/user.model";
import { Role } from "../models/role.model";

export class UserRepository {
    async findAll() {
        return User.findAll({ include: [{ model: Role, as: "Role", include: ["Permissions"] }] });
    }

    async findById(id: number) {
        return User.findByPk(id, { include: [{ model: Role, as: "Role", include: ["Permissions"] }] });
    }

    async findByEmail(email: string) {
        return User.findOne({ where: { email }, include: [{ model: Role, as: "Role", include: ["Permissions"] }] });
    }

    async create(data: Partial<User>) {
        return User.create(data);
    }

    async update(id: number, data: Partial<User>) {
        await User.update(data, { where: { id } });
        return this.findById(id);
    }

    async delete(id: number) {
        return User.destroy({ where: { id } });
    }
}
