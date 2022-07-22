import * as React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { validateUrl } from "../../routes";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import project from "../../../package.json";
import { pages } from "./configs";
import HeaderUserMenu from "./HeaderUserMenu";

const GlobalHeader = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (
    event: React.MouseEvent<HTMLElement>,
    url: string | null
  ): void => {
    let target = url || "";
    if (validateUrl(target)) {
      navigate(target, { replace: false });
    }
    setAnchorElNav(null);
  };

  return (
    <AppBar sx={{ boxShadow: "none" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/", { replace: true })}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {project.name}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.label}
                    onClick={(event) => handleCloseNavMenu(event, page.url)}
                  >
                    <Typography textAlign="center">{t(page.label)}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            }
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate("/", { replace: true })}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {project.name}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={(event) => handleCloseNavMenu(event, page.url)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {t(page.label)}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <HeaderUserMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default GlobalHeader;
