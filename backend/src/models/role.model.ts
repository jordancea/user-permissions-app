import {
    Model,
    DataTypes,
    CreationOptional,
    NonAttribute,
    BelongsToManyGetAssociationsMixin,
    BelongsToManySetAssociationsMixin,
    BelongsToManyAddAssociationsMixin
} from "sequelize";
import { sequelize } from "../config/database";
import { Permission } from "./permission.model";

export class Role extends Model {
    declare id: CreationOptional<number>;
    declare name: string;
    declare Permissions?: NonAttribute<Permission[]>;
    declare getPermissions: BelongsToManyGetAssociationsMixin<Permission>;
    declare setPermissions: BelongsToManySetAssociationsMixin<Permission, number>;
    declare addPermission: BelongsToManyAddAssociationsMixin<Permission, number>;
}

Role.init(
    {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true }
    },
    { sequelize, tableName: "roles" }
);
