import { Breadcrumbs,  Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function NewsBreadcrumbs() {
  const { t } = useTranslation();
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ m: 1, flexGrow: 1 }}>
      <Link underline="hover" color="inherit" href="/">
        {t("breadcrumbs.home")}
      </Link>
      <Link underline="hover" color="inherit" href="/news">
        {t("breadcrumbs.news")}
      </Link>
      <Typography color="text.primary">{t("breadcrumbs.content")}</Typography>
    </Breadcrumbs>
  );
}
