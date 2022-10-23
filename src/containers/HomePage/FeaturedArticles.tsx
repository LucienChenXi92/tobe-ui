import { useState, useEffect } from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NewsDTO } from "../../global/types";
import moment from "moment";
import { server, ROOT_URL, SERVER_URI } from "../../servers";

export default function FeaturedArticles() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState<NewsDTO[]>([]);

  useEffect(() => loadNews(), []);

  function loadNews(): void {
    server
      .get(`${ROOT_URL}/${SERVER_URI.GET_NEWS_ARTICLES}?size=1000&current=1`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setNewsData(response.data.records);
      })
      .catch(() => {});
  }
  return (
    <Grid container component={Paper} sx={{ p: 0 }} variant="outlined">
      {newsData.map((n) => (
        <ArticleItem
          key={n.id}
          author={n.ownerName}
          title={n.title}
          description={n.description}
          publishTime={n.publishTime}
          viewCount={n.viewCount}
          onClick={() => navigate(`/news/article/${n.id}`)}
        />
      ))}
      <Grid container item xs={12} justifyContent="center" sx={{ my: 1 }}>
        <Typography color="text.secondary" variant="body2">
          {t("home-page.end-line")}
        </Typography>
      </Grid>
    </Grid>
  );
}

function ArticleItem(props: {
  author: string;
  title: string;
  description: string;
  publishTime: string | null;
  viewCount: number;
  onClick: () => void;
}) {
  const { t } = useTranslation();
  return (
    <Grid
      container
      item
      onClick={props.onClick}
      xs={12}
      sx={{
        borderBottom: "1px solid rgba(0,0,0,0.12)",
        p: 2,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f3f2ef",
        },
      }}
    >
      <Grid container item xs={12} sx={{ my: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {props.author} | {moment(props.publishTime).format("YYYY-MM-DD")} |{" "}
          {t("home-page.view-count")}: {props.viewCount}
        </Typography>
      </Grid>
      <Grid container item xs={12}>
        <Typography variant="h6" sx={{ wordBreak: "break-all" }}>
          {props.title}
        </Typography>
      </Grid>
      <Grid container item xs={12} sx={{ my: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </Grid>
    </Grid>
  );
}
