export interface RolePermission {
    key: string;
}

export interface Role {
    id: number;
    name: string;
    Permissions: RolePermission[];
}


export interface UpdateRolePermissionsPayload {
    Permissions: string[];
}