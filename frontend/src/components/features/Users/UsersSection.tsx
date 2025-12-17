import { Box, Typography, Stack, Paper } from "@mui/material";
import { UsersToolbar } from "./UsersToolbar";
import { UsersTable } from "./UsersTable";

export const UsersSection = () => {
    return (
        <Stack spacing={3}>
            <Box>
                <Typography variant="h5" component="h1" gutterBottom>
                    Users
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Manage your team members and their permissions. Add, edit, or deactivate users as needed.
                </Typography>
            </Box>

            <UsersToolbar />

            <Paper
                elevation={1}
                sx={{
                    minHeight: 400,
                    borderRadius: 2,
                    p: 4,
                }}
            >
                <UsersTable />
            </Paper>
        </Stack>
    );
};
