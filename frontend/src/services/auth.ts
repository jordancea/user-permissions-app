import { urls } from "../config/urls";
import type { AuthUser, LoginRequest, LoginResponse } from "../types/auth.types";
import { apiRequest } from "../utils/apiRequest";

export async function login(data: LoginRequest): Promise<LoginResponse> {
    return apiRequest<LoginResponse>({
        url: urls.login,
        method: "POST",
        body: data,
    });
}

export async function fetchMe(): Promise<AuthUser> {
    return apiRequest<AuthUser>({
        url: urls.me,
        method: "GET",
    });
}

export async function logout(): Promise<void> {
    return apiRequest<void>({
        url: urls.logout,
        method: "POST",
    });
}
