
import { urls } from "../config/urls";
import type { Role, UpdateRolePermissionsPayload } from "../types/roles.types";
import { apiRequest } from "../utils/apiRequest";


export const fetchRoles = async (): Promise<Role[]> => {
  return apiRequest<Role[]>({
    url: urls.roles,
    method: "GET",
  });
};

export const updateRolePermissions = async (
  roleId: number,
  payload: UpdateRolePermissionsPayload
): Promise<Role> => {
  return apiRequest<Role>({
    url: urls.updatePermissions(roleId),
    method: "PUT",
    body: payload,
  });
};
