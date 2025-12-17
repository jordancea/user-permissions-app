import { Model, DataTypes, CreationOptional } from "sequelize";
import { sequelize } from "../config/database";
import { Role } from "./role.model";

export class Permission extends Model {
    declare id: CreationOptional<number>;
    declare key: string;
    declare description?: string;
    declare getRoles: () => Promise<Role[]>;
    declare setRoles: (roles: Role[]) => Promise<void>;
    declare addRole: (role: Role) => Promise<void>;
}

Permission.init(
    {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        key: { type: DataTypes.STRING, allowNull: false, unique: true },
        description: { type: DataTypes.STRING }
    },
    { sequelize, tableName: "permissions" }
);
