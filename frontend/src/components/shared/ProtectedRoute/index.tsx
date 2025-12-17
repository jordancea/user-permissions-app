import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

import { CircularProgress, Box } from "@mui/material";
import { useMe } from "../../../hooks/useAuth";

interface ProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
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

    if (!user?.id) {
        return <Navigate to="/" replace />;
    }

    return children;
};

