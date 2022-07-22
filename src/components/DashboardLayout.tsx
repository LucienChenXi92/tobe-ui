import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import DashboardNav from "./DashboardNav";
import DashboardHeader from "./header/DashboardHeader";
import AppFooter from "./footer/AppFooter";
import MyMenu from "./common/MyMenu";

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
    marginLeft: `${drawerWidth}px`,
  }),
}));

const drawerWidth = 240;

/**
 * Dashboard layout, a flex container with the basic header, footer and side navigator
 *
 * 看板布局， 一个带有网站页头和页脚的流式布局容器
 */
export default function DashboardLayout({ children }: { children: any }) {
  const [openDrawer, setOpenDrawer] = useState(true);
  const handleChangeNavMenu = () => setOpenDrawer(!openDrawer);

  return (
    <Box
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
      <Main open={openDrawer}>
        <Stack
          justifyContent="center"
          alignItems="center"
          direction="column"
          sx={{
            minHeight: "100vh",
            display: "flex",
            p: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "90%", md: "68%" },
              p: 0,
            }}
          >
            {children}
          </Box>
        </Stack>
        <AppFooter />
      </Main>
      <DashboardNav
        handleChangeNavMenu={handleChangeNavMenu}
        openDrawer={openDrawer}
        drawerWidth={drawerWidth}
      />
      <MyMenu />
    </Box>
  );
}
