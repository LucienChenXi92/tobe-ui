import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./header/DashboardHeader";
import AppFooter from "./footer/AppFooter";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const drawerWidth = 240;

/**
 * Dashboard layout, a flex container with the basic header, footer and side navigator
 *
 * 看板布局， 一个带有网站页头和页脚的流式布局容器
 */
export default function DashboardLayout({ children }: { children: any }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleChangeNavMenu = () => setOpenDrawer(!openDrawer);

  return (
    <Main
      open={openDrawer}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f3f2ef",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <DashboardHeader
        handleChangeNavMenu={handleChangeNavMenu}
        openDrawer={openDrawer}
        drawerWidth={drawerWidth}
      />
      <Stack
        justifyContent="center"
        alignItems="center"
        direction="column"
        sx={{
          minHeight: "100vh",
          display: "flex",
          pl: 2,
          pr: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: { xs: "90%", md: "68%" },
          }}
        >
          {children}
        </Box>
      </Stack>
      <AppFooter />
      <DashboardNav
        handleChangeNavMenu={handleChangeNavMenu}
        openDrawer={openDrawer}
        drawerWidth={drawerWidth}
      />
    </Main>
  );
}
