import { useTranslation } from "react-i18next";
import { Grid, Hidden, Typography, Link } from "@mui/material";
import { Page } from "../../../components";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <Page pageTitle={t("about-page.page-main-title")} openLoading={false}>
      <Grid container sx={{ py: 4 }}>
        <Grid item xs={12} sm={8}>
          <Typography
            color={"textSecondary"}
            variant="h6"
            sx={{ mt: 2, mb: 1 }}
          >
            {t("about-page.about-tobe.title")}
          </Typography>

          <Typography color="textSecondary">
            {t("about-page.about-tobe.p1")}
          </Typography>
          <br />
          <Typography color="textSecondary">
            {t("about-page.about-tobe.p2")}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ px: 4, pt: { xs: 8, sm: 8 } }}>
          <img
            alt="grown-pic"
            width={"100%"}
            height={"240px"}
            src={
              "https://images.pexels.com/photos/886521/pexels-photo-886521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
          />
        </Grid>
      </Grid>

      <Grid container sx={{ py: 4 }}>
        <Grid item xs={12} sm={12}>
          <Typography
            color={"textSecondary"}
            variant="h6"
            sx={{ mt: 2, mb: 1 }}
          >
            {t("about-page.contact.title")}
          </Typography>
          <Typography color="textSecondary">
            {t("about-page.contact.wechat")}
          </Typography>
          <Typography color="textSecondary">
            {t("about-page.contact.email")}
          </Typography>
          <Typography color="textSecondary">
            {t("about-page.contact.linkedin")}
            <Link
              color="textSecondary"
              target="blank"
              href="https://www.linkedin.com/in/lucien-chen-219ab6175/?original_referer=https%3A%2F%2Flucienchen.xyz%2F"
            >
              Lucien Chen
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Page>
  );
}
