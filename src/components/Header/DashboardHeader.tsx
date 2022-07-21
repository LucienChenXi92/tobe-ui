import React from "react";
import { Toolbar, Box, Container, IconButton, Typography } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Apps from "@mui/icons-material/Apps";
import project from "../../../package.json";
import HeaderUserMenu from "./HeaderUserMenu";

interface DashboardHeaderProps {
  handleChangeNavMenu: () => void;
  openDrawer: boolean;
  drawerWidth: number;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const DashboardHeader = (props: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void =>
    props.handleChangeNavMenu();

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${props.drawerWidth}px)`,
      marginLeft: `${props.drawerWidth}px`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <AppBar position="fixed" open={props.openDrawer}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            aria-label="open dashboard side navigator"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
            edge="start"
            sx={{ mr: 2, ...(props.openDrawer && { display: "none" }) }}
          >
            <Apps />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/", { replace: true })}
            sx={{
              mr: 2,
              display: { xs: "flex" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {project.name}
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 0 }}>
            <HeaderUserMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DashboardHeader;
