

import { DataGrid } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";
import { useUsers } from "../../../hooks/useUsers";
import { useUsersColumns } from "../../shared/Cells/hooks/useUsersColumns";


export const UsersTable = () => {
  const { users, isLoading } = useUsers();
  const { columns } = useUsersColumns();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: 600, width: "100%", mt: 3 }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSizeOptions={[10, 25, 50]}
        disableRowSelectionOnClick
      />
    </Box>
  );
};