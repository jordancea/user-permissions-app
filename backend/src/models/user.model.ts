import { Model, DataTypes, CreationOptional } from "sequelize";
import { sequelize } from "../config/database";

export class User extends Model {
    declare id: CreationOptional<number>;
    declare name: string;
    declare email: string;
    declare password: string;
    declare roleId: number;
}

User.init(
    {
        id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        roleId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false }
    },
    { sequelize, tableName: "users" }
);
