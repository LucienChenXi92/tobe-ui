import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { SideNav } from "../../containers/backend/components/navigator";
import { BackendHeader } from "../header";
import { AppFooter } from "../footer";

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
 * a flex container with the basic header, footer and side navigator
 *
 * 一个带有网站页头和页脚的流式布局容器
 */
export default function BackendLayout({ children }: { children: any }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: { xs: "rgba(255,255,255,1)", sm: "#f3f2ef" },
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <BackendHeader
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
      <SideNav
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        drawerWidth={drawerWidth}
      />
    </Box>
  );
}
