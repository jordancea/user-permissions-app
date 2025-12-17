export interface LoginRequest {
  email: string;
  password: string;
}

export interface RolePermission {
  id: number;
  key: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  Permissions: RolePermission[];
}

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  Role: Role; 
}
export interface LoginResponse {
  token: string;
  user: AuthUser;
}
