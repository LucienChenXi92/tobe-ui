import { useState, useEffect, useCallback } from "react";
import { Tabs, Tab, Button, Grid, Typography, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NewsDTO, Domain } from "../../../global/types";
import NewsListItem from "./NewsListItem";
import { PublicDataService } from "../../../services";
import { getPathFromDomain } from "../../../commons";

enum LoadType {
  Append,
  Replace,
}

export default function FeaturedNews(props: {
  tags: string[];
  ownerId: string;
  domain: Domain;
  availableDomains: Domain[];
  handleDomainChange: (newValue: Domain) => void;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [newsData, setNewsData] = useState<NewsDTO[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  function getLinkParam(ownerId: string | number) {
    if (location.pathname.match("personal-portal")) {
      return `?pid=${ownerId}`;
    }
    return "";
  }

  const loadNews = useCallback(
    (
      _domain: Domain,
      _loadType: LoadType,
      _currentPage: number,
      _tags: string[],
      _newsData: NewsDTO[],
      _ownerId: string
    ): void => {
      PublicDataService.getNewsByTags(
        _domain,
        10,
        _currentPage,
        _tags,
        _ownerId
      )
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

  // based on current filters and load more data
  const handleLoadMoreRecords = (): void => {
    loadNews(
      props.domain,
      LoadType.Append,
      current + 1,
      props.tags,
      newsData,
      props.ownerId
    );
  };

  useEffect(() => {
    // reset filter and load the first page data
    const handleTagFilterChange = (): void => {
      loadNews(
        props.domain,
        LoadType.Replace,
        1,
        props.tags,
        newsData,
        props.ownerId
      );
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
        {props.availableDomains.includes(Domain.Article) && (
          <Tab value={Domain.Article} label={t("home-page.articles")} />
        )}
        {props.availableDomains.includes(Domain.Project) && (
          <Tab value={Domain.Project} label={t("home-page.projects")} />
        )}
        {props.availableDomains.includes(Domain.Vocabulary) && (
          <Tab value={Domain.Vocabulary} label={t("home-page.vocabularies")} />
        )}
      </Tabs>
      {newsData.length > 0 ? (
        <>
          {newsData.map((n) => (
            <NewsListItem
              key={n.id}
              owner={n.ownerName}
              ownerId={n.ownerId}
              title={n.title}
              description={n.description}
              publishTime={n.publishTime}
              viewCount={n.viewCount}
              tags={n.tags}
              onClick={() =>
                navigate(
                  `/news/${getPathFromDomain(n.domain)}/${n.id}` +
                    getLinkParam(n.ownerId)
                )
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
              <Button variant="text" onClick={handleLoadMoreRecords}>
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
