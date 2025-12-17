export interface UserPermission {
    id: number;
    key: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface UserRole {
    id: number;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    Permissions: UserPermission[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    roleId: number;
    createdAt?: string;
    updatedAt?: string;
    Role: UserRole;
}

export interface UserCreatePayload {
    name: string;
    email: string;
    roleId: number;
    password: string;
}
export interface UserUpdatePayload {
    name: string;
    email: string;
    roleId: number;
    password?: string;
}

export type UserUpsertPayload = UserCreatePayload | UserUpdatePayload;