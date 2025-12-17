import { UserRepository } from "../repositories/user.repository";
import { IUser } from "../interfaces/user.interface";

export class UserService {
    constructor(private repo = new UserRepository()) { }

    findAll() {
        return this.repo.findAll();
    }

    findById(id: number) {
        return this.repo.findById(id);
    }

    findByEmail(email: string) {
        return this.repo.findByEmail(email);
    }

    create(data: IUser) {
        return this.repo.create(data);
    }

    update(id: number, data: IUser) {
        return this.repo.update(id, data);
    }

    delete(id: number) {
        return this.repo.delete(id);
    }
}
