import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Paper, Grid, Typography } from "@mui/material";
import { Page, ArticleItem } from "../../components";
import { NewsDTO } from "../../global/types";
import { getNews } from "./NewsService";

export default function NewsSearchPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { newsType } = useParams();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [newsData, setNewsData] = useState<NewsDTO[]>([]);

  useEffect(() => loadNews(), []);

  function loadNews(): void {
    setOpenLoading(true);
    getNews(newsType || "articles")
      .then((response) => {
        setNewsData(response.data.records);
      })
      .catch(() => {})
      .finally(() => setOpenLoading(false));
  }

  return (
    <Page pageTitle={t("news-page.page-main-title")} openLoading={openLoading}>
      <Grid container sx={{ py: 2 }}>
        <Grid container xs={12}>
          <Grid
            container
            component={Paper}
            item
            sx={{
              py: 1,
              mb: 1,
              display: {
                md: "none",
              },
            }}
          ></Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid
            container
            item
            md={9}
            component={Paper}
            sx={{ p: 0 }}
            variant="outlined"
          >
            {newsData.map((n) => (
              <ArticleItem
                key={n.id}
                author={n.ownerName}
                title={n.title}
                description={n.description}
                publishTime={n.publishTime}
                viewCount={n.viewCount}
                tags={n.tags}
                onClick={() => navigate(`/news/${newsType}/${n.id}`)}
              />
            ))}
            <Grid container item xs={12} justifyContent="center" sx={{ my: 1 }}>
              <Typography color="text.secondary" variant="body2">
                {t("home-page.end-line")}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item md={3}>
            <Grid container></Grid>
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
}
