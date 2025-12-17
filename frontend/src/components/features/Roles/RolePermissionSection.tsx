import React, { useMemo, useState } from "react";
import {
  Box,
  Checkbox,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { useRoles, useUpdateRolePermissions } from "../../../hooks/useRoles";
import { useAllPermissions } from "../../../hooks/useAllPermissions";
import { usePermissions } from "../../../hooks/usePermissions";

export const RolePermissionSection: React.FC = () => {
  const { roles = [], isLoading: isLoadingRoles } = useRoles();
  const { allPermissions = [], isLoading: isLoadingPermissions } =
    useAllPermissions();
  const { can } = usePermissions();

  const { mutate, isPending } = useUpdateRolePermissions();

  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const selectedRole = useMemo(
    () => roles.find((r) => r.id === selectedRoleId),
    [roles, selectedRoleId]
  );

  const canEdit = can("roles:update");
  const canView = canEdit || can("content:edit");

  const isDirty = useMemo(() => {
    if (!selectedRole) return false;
    const original = selectedRole.Permissions.map((p) => p.id).sort();
    const current = [...selectedPermissions].sort();
    return JSON.stringify(original) !== JSON.stringify(current);
  }, [selectedRole, selectedPermissions]);

  if (!canView) return null;

  const handleSelectRole = (role: any) => {
    setSelectedRoleId(role.id);
    setSelectedPermissions(role.Permissions.map((p: any) => p.id));
  };

  const handleTogglePermission = (permissionId: number) => {
    if (!canEdit) return;
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSave = () => {
    if (!selectedRole || !canEdit) return;
    mutate({
      roleId: selectedRole.id,
      payload: selectedPermissions,
    });
  };

  return (
    <Stack direction="row" spacing={3}>
      <Paper sx={{ width: 260 }}>
        <Typography variant="h6" p={2}>
          Roles
        </Typography>
        {isLoadingRoles ? (
          <Typography p={2}>Loading roles...</Typography>
        ) : (
          <List disablePadding>
            {roles.map((role) => (
              <ListItemButton
                key={role.id}
                selected={role.id === selectedRoleId}
                onClick={() => handleSelectRole(role)}
                disabled={isPending}
              >
                <ListItemText primary={role.name} />
              </ListItemButton>
            ))}
          </List>
        )}
      </Paper>
      {selectedRole && (
        <Paper sx={{ flex: 1, opacity: canEdit ? 1 : 0.6 }}>
          <Typography variant="h6" p={2}>
            Permissions
          </Typography>
          {isLoadingPermissions ? (
            <Typography p={2}>Loading permissions...</Typography>
          ) : (
            <List disablePadding>
              {allPermissions.map((permission) => (
                <ListItemButton
                  key={permission.id}
                  dense
                  onClick={() => handleTogglePermission(permission.id)}
                  disabled={isPending || !canEdit}
                >
                  <Checkbox
                    edge="start"
                    checked={selectedPermissions.includes(permission.id)}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={permission.key} />
                </ListItemButton>
              ))}
            </List>
          )}

          {canEdit && !isLoadingPermissions && (
            <Box p={2} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={!isDirty || isPending}
              >
                Save
              </Button>
            </Box>
          )}
        </Paper>
      )}
    </Stack>
  );
};
