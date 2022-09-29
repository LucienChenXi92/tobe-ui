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
    [theme.breakpoints.up("md")]: {
      marginLeft: `${drawerWidth}px`,
    },
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
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        drawerWidth={drawerWidth}
      />
      <Main open={openDrawer}>
        <Stack
          sx={{
            minHeight: "100vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {children}
          </Box>
        </Stack>
        <AppFooter />
      </Main>
      <DashboardNav
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        drawerWidth={drawerWidth}
      />
      {/* <MyMenu /> */}
    </Box>
  );
}
