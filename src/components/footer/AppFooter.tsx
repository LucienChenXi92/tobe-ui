import React from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { LANGUAGE } from "../../i18n";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";
import Copyright from "./CopyRight";

export default function AppFooter() {
  const availableLangs: Array<{ label: string; value: string }> = [
    { label: "app-footer.language.options.zh", value: LANGUAGE.ZH },
    { label: "app-footer.language.options.en", value: LANGUAGE.EN },
  ];

  const externalLinks = [
    { label: "app-footer.github", url: "https://github.com/LucienChenXi92" },
    { label: "app-footer.blog", url: "https://lucienchen.xyz" },
    {
      label: "app-footer.linked-in",
      url: "https://www.linkedin.com/in/lucien-chen-219ab6175/",
    },
  ];

  const [anchorElLang, setAnchorElLang] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenLangMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElLang(event.currentTarget);
  };
  const handleCloseLangMenu = (
    event: React.MouseEvent<HTMLElement>,
    value: string
  ): void => {
    if (validateLanguage(value)) {
      changeLanguage(value);
    }
    setAnchorElLang(null);
  };

  function validateLanguage(target: string): boolean {
    if (Object.values(LANGUAGE).indexOf(target) > -1) {
      return true;
    }
    return false;
  }

  const { t } = useTranslation();
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        paddingTop: "15px",
        paddingBottom: "10px",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container fixed>
        <Grid item md={3} xl={12}>
          <Copyright />
        </Grid>
        <Grid container>
          <Grid container item xs={3} md={3} justifyContent="center">
            <Button
              size="small"
              aria-label={t("app-footer.language.btn-tooltip")}
              aria-controls="menu-footer"
              aria-haspopup="true"
              onClick={handleOpenLangMenu}
            >
              <Typography variant="body2" color="text.secondary" align="center">
                {t("app-footer.language.btn-label")}
              </Typography>
            </Button>
            <Menu
              id="menu-footer"
              anchorEl={anchorElLang}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElLang)}
              onClose={handleCloseLangMenu}
            >
              {availableLangs.map((language) => (
                <MenuItem
                  key={language.label}
                  onClick={(e) => handleCloseLangMenu(e, language.value)}
                >
                  <Typography textAlign="center">
                    {t(language.label)}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Grid>
          {externalLinks.map((link) => (
            <Grid
              container
              item
              xs={3}
              md={3}
              justifyContent="center"
              key={link.url}
            >
              <Button size="small" href={link.url} target="_blank">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {t(link.label)}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
