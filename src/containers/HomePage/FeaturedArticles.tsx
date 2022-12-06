import { useState, useEffect } from "react";
import { Button, Grid, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NewsDTO } from "../../global/types";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import { ArticleItem } from "../../components";

enum LoadType {
  Append,
  Replace,
}

export default function FeaturedArticles(props: { tags: string[] }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState<NewsDTO[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => handleTagFilterChange(props.tags), [props.tags]);

  function loadNews(
    loadType: LoadType,
    currentPage: number,
    tags: string[]
  ): void {
    server
      .get(
        `${ROOT_URL}/${SERVER_URI.GET_NEWS_ARTICLES}?size=10&current=${currentPage}&tags=${tags}`
      )
      .then((response) => {
        if (loadType === LoadType.Append) {
          setNewsData(newsData.concat(response.data.records));
        } else {
          setNewsData(response.data.records);
        }
        setCurrent(response.data.current);
        setTotalPage(response.data.pages);
      })
      .catch(() => {});
  }

  // reset filter and load the first page data
  // the tags must passed from args othervise the value is not up to date
  function handleTagFilterChange(tags: string[]) {
    loadNews(LoadType.Replace, 1, tags);
  }

  // based on current filters and load more data
  function handleLoadMoreArticles() {
    loadNews(LoadType.Append, current + 1, props.tags);
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
          <Button variant="text" onClick={handleLoadMoreArticles}>
            {t("home-page.load-more")}
          </Button>
        </Grid>
      )}
    </Grid>
  ) : (
    <></>
  );
}
