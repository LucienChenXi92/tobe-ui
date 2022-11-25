import { useState, useEffect } from "react";
import { Button, Grid, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NewsDTO } from "../../global/types";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import { ArticleItem } from "../../components";

export default function FeaturedArticles() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState<NewsDTO[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => loadNews(), [current]);

  function loadNews(): void {
    server
      .get(
        `${ROOT_URL}/${SERVER_URI.GET_NEWS_ARTICLES}?size=15&current=${current}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setNewsData(newsData.concat(response.data.records));
        setCurrent(response.data.current);
        setTotalPage(response.data.pages);
      })
      .catch(() => {});
  }

  return newsData.length > 0 ? (
    <Grid container component={Paper} sx={{ p: 0 }} variant="outlined">
      {newsData.map((n) => (
        <ArticleItem
          key={n.id}
          author={n.ownerName}
          title={n.title}
          description={n.description}
          publishTime={n.publishTime}
          viewCount={n.viewCount}
          tags={n.tags}
          onClick={() => navigate(`/news/articles/${n.id}`)}
        />
      ))}
      {current >= totalPage ? (
        <Grid container item xs={12} justifyContent="center" sx={{ my: 1 }}>
          <Typography color="text.secondary" variant="body2">
            {t("home-page.end-line")}
          </Typography>
        </Grid>
      ) : (
        <Grid container item xs={12} justifyContent="center" sx={{ my: 1 }}>
          <Button variant="text" onClick={() => setCurrent(current + 1)}>
            {t("home-page.load-more")}
          </Button>
        </Grid>
      )}
    </Grid>
  ) : (
    <></>
  );
}
