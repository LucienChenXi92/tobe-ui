import React from "react";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { URL, validateUrl } from "../../routes";
import { useAuthState } from "../../contexts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { settings } from "./configs";

export default function HeaderUserMenu() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget);
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

  const authContext = useAuthState();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
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
    </>
  );
}
