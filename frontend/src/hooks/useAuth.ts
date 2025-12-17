import { useMutation, useQuery } from "@tanstack/react-query";
import type { AuthUser, LoginRequest, LoginResponse } from "../types/auth.types";
import type { ErrorResponse } from "../types/ErrorResponse";
import { fetchMe, login, logout } from "../services/auth";
import { useAlertStore } from "../components/shared/Alert/useAlertStore";
import { emptyAuthUser } from "../utils/emptyObjects/auth";
import { queryClient } from "../config/queryClient";


export const useLogin = () => {
    const dispatchAlert = useAlertStore((state) => state.dispatch);

    const { mutate, isPending } = useMutation<LoginResponse, ErrorResponse, LoginRequest>({
        mutationFn: login,
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["me"] });
            dispatchAlert({
                type: "ALERT/SET_SUCCESS",
                payload: {
                    successMessage: "Logged in successfully",
                    autoHideMs: 3000,
                },
            });
        },
        onError: (error) => {
            dispatchAlert({
                type: "ALERT/SET_ERROR",
                payload: {
                    errorMessage: error.error_message || "Invalid credentials",
                    autoHideMs: 5000,
                },
            });
        },
    });

    return {
        mutate,
        isPending,
    };
};


export const useMe = () => {
    const query = useQuery<AuthUser, ErrorResponse>({
        queryKey: ["me"],
        queryFn: fetchMe,
        staleTime: 0,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retry: false,
    });

    return {
        user: query.data ?? emptyAuthUser,
        isLoading: query.isLoading,
        isAuthenticated: Boolean(query.data?.id),
    };
};



export const useLogout = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.setQueryData(["me"], null);
        },
    });
    return {
        mutate,
        isPending,
    };
};
