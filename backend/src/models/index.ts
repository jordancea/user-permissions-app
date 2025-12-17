import { sequelize } from "../config/database";
import { User } from "./user.model";
import { Role } from "./role.model";
import { Permission } from "./permission.model";
import { RolePermission } from "./role-permission.model";


User.belongsTo(Role, { foreignKey: "roleId", as: "Role" });
Role.hasMany(User, { foreignKey: "roleId", as: "Users" });

Role.belongsToMany(Permission, {
    through: RolePermission,
    foreignKey: "roleId",
    otherKey: "permissionId",
    as: "Permissions"
});
Permission.belongsToMany(Role, {
    through: RolePermission,
    foreignKey: "permissionId",
    otherKey: "roleId",
    as: "Roles"
});

export { sequelize, User, Role, Permission, RolePermission };
