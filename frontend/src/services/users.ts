import { urls } from "../config/urls";
import type { User, UserUpsertPayload } from "../types/users.types";
import { apiRequest } from "../utils/apiRequest";


export const fetchUsers = async (): Promise<User[]> => {
  return apiRequest<User[]>({
    url: urls.users,
    method: "GET",
  });
};

export const createUser = async (
  payload: UserUpsertPayload
): Promise<User> => {
  return apiRequest<User>({
    url: urls.createUser,
    method: "POST",
    body: payload,
  });
};

export const updateUser = async (
  id: number,
  payload: UserUpsertPayload
): Promise<User> => {
  return apiRequest<User>({
    url: urls.updateUser(id),
    method: "PUT",
    body: payload,
  });
};

export const deleteUser = async (id: number): Promise<void> => {
  return apiRequest<void>({
    url: urls.deleteUser(id),
    method: "DELETE",
  });
};
