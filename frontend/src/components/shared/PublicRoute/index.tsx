import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useMe } from "../../../hooks/useAuth";


interface PublicRouteProps {
  children: JSX.Element;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, isLoading } = useMe();

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (user?.id) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
