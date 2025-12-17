import {
    MenuItem,
    Select,
    Skeleton,
    type SelectChangeEvent,
} from "@mui/material";
import { useRoles } from "../../../hooks/useRoles";
import { useUpdateUser } from "../../../hooks/useUsers";
import type { UserRow } from "./hooks/useUsersColumns";


interface RoleSelectCellProps {
    row: UserRow;
    disabled?: boolean;
}

export const RoleSelectCell = ({ row, disabled }: RoleSelectCellProps) => {
    const { roles = [], isLoading: isLoadingRoles } = useRoles();
    const { mutate, isPending } = useUpdateUser();

    const handleChange = (event: SelectChangeEvent<number>) => {
        const roleId = Number(event.target.value);

        if (roleId === row.roleId) return;

        mutate({
            id: row.id,
            payload: {
                name: row.name,
                email: row.email,
                roleId,
            },
        });
    };

    if (isLoadingRoles) {
        return <Skeleton variant="rounded" height={32} />;
    }

    return (
        <Select
            size="small"
            value={row.roleId}
            onChange={handleChange}
            disabled={disabled || isPending}
            fullWidth
        >
            {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                    {role.name}
                </MenuItem>
            ))}
        </Select>
    );
};
