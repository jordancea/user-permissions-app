import React from "react";
import { AppBar as MuiAppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLogout, useMe } from "../../hooks/useAuth";

export const AppBar: React.FC = () => {
  const { user } = useMe();
  const { mutate: logoutMutate, isPending } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutMutate(undefined, {
      onSuccess: () => {
        navigate("/", { replace: true });
      },
    });
  };

  return (
    <MuiAppBar  position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">My App</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography>{ user.name || user.email}</Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            disabled={isPending}
          >
            {isPending ? "Logging out..." : "Logout"}
          </Button>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};
