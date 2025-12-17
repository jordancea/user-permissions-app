import { Box } from "@mui/material";
import type { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "lg", 
        mx: "auto",          
        px: { xs: 2, sm: 3, md: 4 }, 
        py: 3,
      }}
    >
      {children}
    </Box>
  );
};

export default PageLayout;