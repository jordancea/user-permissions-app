import React from "react";
import { Box, Stack } from "@mui/material";
import { AppBar } from "../components/features/AppBar";
import PageLayout from "../components/layouts/PageLayout";
import { UsersSection } from "../components/features/Users/UsersSection";
import CustomDialog from "../components/shared/CustomDialog";
import { RolePermissionSection } from "../components/features/Roles/RolePermissionSection";

const DashboardPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar />
      <Box sx={{ pt: { xs: 7, sm: 8 } }}>
        <PageLayout>
          <Stack spacing={4}>
            <UsersSection />
            <RolePermissionSection />
          </Stack>
          <CustomDialog />
        </PageLayout>
      </Box>
    </Box>
  );
};

export default DashboardPage;
