export interface RolePermission {
    id: number;
    key: string;
}

export interface Role {
    id: number;
    name: string;
    Permissions: RolePermission[];
}

