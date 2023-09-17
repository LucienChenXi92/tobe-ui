import { useState, useEffect, useCallback } from "react";
import { Tabs, Tab, Button, Grid, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NewsDTO, Domain } from "../../../global/types";
import { NewsListItem } from "../../../components";
import { PublicDataService } from "../../../services";
import { ca } from "date-fns/locale";

enum LoadType {
  Append,
  Replace,
}

export default function FeaturedArticles(props: {
  tags: string[];
  domain: Domain;
  handleDomainChange: (newValue: Domain) => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [newsData, setNewsData] = useState<NewsDTO[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const loadNews = useCallback(
    (
      _domain: Domain,
      _loadType: LoadType,
      _currentPage: number,
      _tags: string[],
      _newsData: NewsDTO[]
    ): void => {
      PublicDataService.getNewsByTags(_domain, 10, _currentPage, _tags)
        .then((response) => {
          if (_loadType === LoadType.Append) {
            setNewsData(_newsData.concat(response.data.records));
          } else {
            setNewsData(response.data.records);
          }
          setCurrent(response.data.current);
          setTotalPage(response.data.pages);
        })
        .catch(() => {});
    },
    []
  );

  function getURIbyDomain(domain: Domain | string): string {
    switch (domain) {
      case Domain.Vocabulary:
        return "vocabularies";
      default:
        return domain.toLowerCase() + "s";
    }
  }

  // based on current filters and load more data
  const handleLoadMoreArticles = (): void => {
    loadNews(props.domain, LoadType.Append, current + 1, props.tags, newsData);
  };

  useEffect(() => {
    // reset filter and load the first page data
    const handleTagFilterChange = (): void => {
      loadNews(props.domain, LoadType.Replace, 1, props.tags, newsData);
    };
    handleTagFilterChange();
  }, [props.domain, props.tags, loadNews]); // eslint-disable-line

  return (
    <Grid
      container
      component={Paper}
      sx={{ p: 0, width: "100%" }}
      variant="outlined"
    >
      <Tabs
        value={props.domain}
        onChange={(event: React.SyntheticEvent, newValue: Domain) =>
          props.handleDomainChange(newValue)
        }
        sx={{
          width: "100%",
          borderBottom: "1px solid rgba(0,0,0,0.12)",
          "& .MuiTab-root": {
            fontSize: "1rem",
            fontWeight: 400,
            py: 1.5,
            lineHeight: 1.75,
          },
        }}
        variant="fullWidth"
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab value={Domain.Article} label={t("home-page.articles")} />
        <Tab value={Domain.Vocabulary} label={t("home-page.vocabularies")} />
        <Tab value={Domain.Project} label={t("home-page.projects")} />
      </Tabs>
      {newsData.length > 0 ? (
        <>
          {newsData.map((n) => (
            <NewsListItem
              key={n.id}
              owner={n.ownerName}
              title={n.title}
              description={n.description}
              publishTime={n.publishTime}
              viewCount={n.viewCount}
              tags={n.tags}
              onClick={() =>
                navigate(`/news/${getURIbyDomain(n.domain)}/${n.id}`)
              }
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
        </>
      ) : (
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          alignContent="center"
          sx={{ my: 1, minHeight: "100px" }}
        >
          <Typography color="text.secondary" variant="body2">
            {t("home-page.no-content")}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
