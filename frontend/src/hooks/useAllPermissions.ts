import type { RolePermission } from "../types/roles.types";
import { useRoles } from "./useRoles";


export const useAllPermissions = () => {
    const { roles, isLoading } = useRoles();

    const allPermissions: RolePermission[] = Array.from(
        new Map(
            roles.flatMap(role =>
                role.Permissions.map(p => [p.key, p])
            )
        ).values()
    );

    return { allPermissions, isLoading };
};
