import { useState } from "react";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import Page from "../../components/Page";
import { URL } from "../../routes";

export default function ArticleCreationPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState<boolean>(false);

  function createArticle(): void {
    setOpenLoading(true);
    server
      .get(`${ROOT_URL}/${SERVER_URI.GET_PROJECT_OVERVIEW}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {})
      .catch(() => {
        enqueueSnackbar(t("dashboard-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

  return (
    <Page
      openLoading={openLoading}
      pageTitle={t("dashboard-page.page-main-title")}
    >
      <Grid container spacing={2} sx={{ py: 2 }}></Grid>
    </Page>
  );
}
