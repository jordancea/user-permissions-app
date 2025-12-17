import { Box, Button } from "@mui/material";
import { usePermissions } from "../../../hooks/usePermissions";
import { useDialogStore } from "../../shared/CustomDialog/dialogStore";
import { UserForm } from "./UserForm";


export const UsersToolbar = () => {
    const { openDialog } = useDialogStore();
    const { can } = usePermissions();

    if (!can("user:create")) return null;

    const handleOpen = () => {
        openDialog({
            title: "Create User",
            size: "md",
            content: <UserForm />,
        });
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
                mb: { xs: 3, sm: 4 },
                mt: { xs: 2, sm: 1 },
            }}
        >
            <Button variant="contained" size="large" onClick={handleOpen}>
                Add User
            </Button>
        </Box>
    );
};