
import type { AuthUser, LoginResponse, Role, RolePermission } from "../../types/auth.types";

const emptyPermissionsArray: RolePermission[] = [];


export const emptyRole: Role = {
    id: 0,
    name: "",
    createdAt: "",
    updatedAt: "",
    Permissions: emptyPermissionsArray,
};

export const emptyAuthUser: AuthUser = {
    id: 0,
    email: "",
    name: "",
    roleId: 0,
    createdAt: "",
    updatedAt: "",
    Role: emptyRole,
};

export const emptyLoginResponse: LoginResponse = {
    token: "",
    user: emptyAuthUser,
};