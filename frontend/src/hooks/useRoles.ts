import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchRoles, updateRolePermissions } from "../services/roles";
import type { Role,  } from "../types/roles.types";
import { emptyRolesList } from "../utils/emptyObjects/emptyRoles";
import { useAlertStore } from "../components/shared/Alert/useAlertStore";


export const useRoles = () => {
    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery<Role[], Error>({
        queryKey: ["roles"],
        queryFn: fetchRoles,
    });

    return {
        roles: data || emptyRolesList,
        isLoading,
        isError,
        error,
    };
};


export const useUpdateRolePermissions = () => {
    const queryClient = useQueryClient();

    const dispatchAlert = useAlertStore((state) => state.dispatch);

    return useMutation({
        mutationFn: ({
            roleId,
            payload,
        }: {
            roleId: number;
            payload: number[];
        }) => updateRolePermissions(roleId, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["roles"] });
            dispatchAlert({
                type: "ALERT/SET_SUCCESS",
                payload: {
                    successMessage: "Role permissions updated successfully",
                    autoHideMs: 3000,
                },
            });
        },
        onError: () => {
            dispatchAlert({
                type: "ALERT/SET_ERROR",
                payload: {
                    errorMessage:  "Failed to update role permissions",
                    autoHideMs: 5000,
                },
            });
        },
    });
    
};
