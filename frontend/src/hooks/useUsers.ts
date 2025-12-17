import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { User, UserUpsertPayload } from "../types/users.types";
import { createUser, deleteUser, fetchUsers, updateUser } from "../services/users";
import { emptyUsersList } from "../utils/emptyObjects/emptyUser";
import { useAlertStore } from "../components/shared/Alert/useAlertStore";


export const useUsers = () => {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery<User[], Error>({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    return {
        users: data || emptyUsersList,
        isLoading,
        isError,
        error,
    };
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    const dispatchAlert = useAlertStore((state) => state.dispatch);

    return useMutation({
        mutationFn: (payload: UserUpsertPayload) => createUser(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            dispatchAlert({
                type: "ALERT/SET_SUCCESS",
                payload: {
                    successMessage: "User created successfully",
                    autoHideMs: 3000,
                },
            });
        },
        onError: () => {
            dispatchAlert({
                type: "ALERT/SET_ERROR",
                payload: {
                    errorMessage: "Failed to create user",
                    autoHideMs: 5000,
                },
            });
        },
    });
};


export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const dispatchAlert = useAlertStore((state) => state.dispatch);

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: number;
            payload: UserUpsertPayload;
        }) => updateUser(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            dispatchAlert({
                type: "ALERT/SET_SUCCESS",
                payload: {
                    successMessage: "User updated successfully",
                    autoHideMs: 3000,
                },
            });
        },
        onError: () => {
            dispatchAlert({
                type: "ALERT/SET_ERROR",
                payload: {
                    errorMessage: "Failed to update user",
                    autoHideMs: 5000,
                },
            });
        },
    });
};


export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const dispatchAlert = useAlertStore((state) => state.dispatch);

    return useMutation({
        mutationFn: (id: number) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            dispatchAlert({
                type: "ALERT/SET_SUCCESS",
                payload: {
                    successMessage: "User deleted successfully",
                    autoHideMs: 3000,
                },
            });
        },
        onError: () => {
            dispatchAlert({
                type: "ALERT/SET_ERROR",
                payload: {
                    errorMessage: "Failed to delete user",
                    autoHideMs: 5000,
                },
            });
        },
    });
};
