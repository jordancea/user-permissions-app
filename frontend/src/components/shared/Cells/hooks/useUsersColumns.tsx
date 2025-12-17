import { Box, Button, Chip, Typography } from "@mui/material";
import { usePermissions } from "../../../../hooks/usePermissions";
import { useDeleteUser } from "../../../../hooks/useUsers";
import { UserForm } from "../../../features/Users/UserForm";
import { useDialogStore } from "../../CustomDialog/dialogStore";
import type { GridColDef } from "@mui/x-data-grid";
import ActionsCell from "../ActionsCell";
import { RoleSelectCell } from "../RoleSelectCell";


export interface UserRow {
  id: number;
  name: string;
  email: string;
  roleId: number;
  Role: { id: number; name: string };
}

export const useUsersColumns = () => {
  const { openDialog, closeDialog } = useDialogStore();
  const { mutate: deleteUser } = useDeleteUser();
  const { can } = usePermissions();

  const handleEdit = (row: UserRow) => {
    openDialog({
      title: "Edit User",
      size: "md",
      content: (
        <UserForm
          initialData={{
            id: row.id,
            name: row.name,
            email: row.email,
            roleId: row.roleId,
          }}
        />
      ),
    });
  };

  const handleDelete = (row: UserRow) => {
    openDialog({
      title: "Delete User",
      content: (
        <Box sx={{ p: 2 }}>
          <Typography sx={{ mb: 3 }}>
            Are you sure you want to delete <strong>{row.name}</strong> ({row.email})?
            This action cannot be undone.
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Button onClick={closeDialog}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                deleteUser(row.id, {
                  onSuccess: () => closeDialog(),
                });
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      ),
    });
  };

  const columns: GridColDef<UserRow>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      align: "center",
      headerAlign: "center",
      renderCell: () => (
        <Chip
          label="Active"
          color="success"
          size="small"
          sx={{
            fontWeight: "bold",
            minWidth: 80,
          }}
        />
      ),
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <RoleSelectCell
          row={params.row}
          disabled={!can("user:update")}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <ActionsCell
          row={params.row}
          handleEditClick={handleEdit}
          handleDeleteClick={handleDelete}
          canEdit={can("user:update")}
          canDelete={can("user:delete")}
        />
      ),
    },
  ];

  return { columns };
};