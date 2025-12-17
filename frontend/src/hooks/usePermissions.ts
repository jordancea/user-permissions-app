import { useMe } from "./useAuth";

export const usePermissions = () => {
    const { user, isAuthenticated } = useMe();

    const permissions: string[] =
        user?.Role?.Permissions?.map((permission) => permission.key) ?? [];

    const can = (permission: string): boolean => {
        if (!isAuthenticated) return false;
        return permissions.includes(permission);
    };

    const canAny = (perms: string[]): boolean => {
        if (!isAuthenticated) return false;
        return perms.some((p) => permissions.includes(p));
    };


    const canAll = (perms: string[]): boolean => {
        if (!isAuthenticated) return false;
        return perms.every((p) => permissions.includes(p));
    };

    return {
        permissions,
        can,
        canAny,
        canAll,
    };
};