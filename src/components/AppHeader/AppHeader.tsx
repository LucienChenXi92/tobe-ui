import * as React from "react";
import {
  Avatar,
  AppBar,
  Toolbar,
  Box,
  Container,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useAuthState } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { URL, validateUrl } from "../../routes";
import { useTranslation } from "react-i18next";
import MenuIcon from "@mui/icons-material/Menu";
import Lightbulb from "@mui/icons-material/Lightbulb";
import project from "../../../package.json";

const pages: Array<{ label: string; url: string }> = [
  { label: "app-header.pages.news", url: URL.NEWS },
  { label: "app-header.pages.blog", url: URL.BLOG },
  { label: "app-header.pages.about", url: URL.ABOUT },
];

const settings: Array<{ label: string; url: string }> = [
  { label: "app-header.settings.profile", url: URL.PROFILE },
  { label: "app-header.settings.dashboard", url: URL.DASHBOARD },
  { label: "app-header.settings.sign-out", url: URL.SIGN_OUT },
];

const AppHeader = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const authContext = useAuthState();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
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
  const handleCloseUserMenu = (
    event: React.MouseEvent<HTMLElement>,
    url: string | null
  ): void => {
    let target = url || "";
    if (validateUrl(target)) {
      navigate(target, { replace: false });
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Lightbulb sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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

          <Lightbulb sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
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
            {authContext.user ? (
              <Tooltip title={t("app-header.settings.btn-tooltip")}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={authContext.user.firstName}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Button
                key={URL.SIGN_IN}
                onClick={() => navigate(URL.SIGN_IN, { replace: true })}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {t("app-header.sign-in-btn")}
              </Button>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.label}
                  onClick={(e) => handleCloseUserMenu(e, setting.url)}
                >
                  <Typography textAlign="center">{t(setting.label)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppHeader;
