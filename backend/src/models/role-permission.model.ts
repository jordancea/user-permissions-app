import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export class RolePermission extends Model {
    declare roleId: number;
    declare permissionId: number;
}

RolePermission.init(
    {
        roleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true },
        permissionId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, primaryKey: true }
    },
    {
        sequelize,
        tableName: "role_permissions",
        timestamps: false
    }
);
