
import { urls } from "../config/urls";
import type { Role,} from "../types/roles.types";
import { apiRequest } from "../utils/apiRequest";


export const fetchRoles = async (): Promise<Role[]> => {
  return apiRequest<Role[]>({
    url: urls.roles,
    method: "GET",
  });
};

export const updateRolePermissions = async (
  roleId: number,
  payload: number[]
): Promise<Role> => {
  return apiRequest<Role>({
    url: urls.updatePermissions(roleId),
    method: "PUT",
    body: { permissionIds: payload },
  });
};
