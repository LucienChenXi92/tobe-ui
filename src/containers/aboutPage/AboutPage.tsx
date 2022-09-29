import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { Page } from "../../components";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <Page pageTitle={t("about-page.page-main-title")} openLoading={false}>
      <Grid container spacing={2} sx={{ py: 2 }}>
        <p>Coming soon!</p>
      </Grid>
    </Page>
  );
}
