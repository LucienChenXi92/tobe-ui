import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Grid, Tooltip } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import ArticleIcon from "@mui/icons-material/Article";
import { Page } from "../../components";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import theme from "../../theme";
import { NewsDTO } from "../../global/types";
import { StandardNewsCard } from "./StandardNewsCard";
import { TimeFormat } from "../../commons";

export default function NewsPage() {
  const { t } = useTranslation();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [newsData, setNewsData] = useState<NewsDTO[]>([]);

  function getNewsTypeIconByValue(typeValue: string) {
    switch (typeValue) {
      case "1":
        return (
          <Tooltip title={t("news-page.news-types.project")}>
            <FlagIcon
              sx={{
                fontSize: "1.3rem",
                mr: 1,
                color: theme.palette.warning.main,
              }}
            />
          </Tooltip>
        );
      case "2":
        return (
          <Tooltip title={t("news-page.news-types.article")}>
            <ArticleIcon
              sx={{ fontSize: "1.3rem", mr: 1, color: theme.palette.info.main }}
            />
          </Tooltip>
        );
      default:
        return null;
    }
  }

  function getSubRouteByTypeValue(typeValue: string) {
    switch (typeValue) {
      case "1":
        return "project";
      case "2":
        return "article";
      default:
        return "";
    }
  }

  useEffect(() => loadNews(), []);

  function loadNews(): void {
    setOpenLoading(true);
    server
      .get(`${ROOT_URL}/${SERVER_URI.GET_NEWS}?size=1000&current=1`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setNewsData(response.data.records);
      })
      .catch(() => {})
      .finally(() => setOpenLoading(false));
  }

  return (
    <Page pageTitle={t("news-page.page-main-title")} openLoading={openLoading}>
      <Grid container spacing={2} sx={{ py: 2 }}>
        {newsData.map((n: NewsDTO) => (
          <StandardNewsCard
            data={{
              title: n.title,
              description: n.description,
              newsTypeIcon: getNewsTypeIconByValue(n.newsType),
              creater: n.ownerName,
              avatarUrl: n.avatarUrl,
              createTime: TimeFormat.briefDateFormat(n.createTime),
              updateTime: n.updateTime
                ? TimeFormat.briefDateFormat(n.updateTime)
                : null,
              publishTime: n.publishTime
                ? TimeFormat.briefDateFormat(n.publishTime)
                : TimeFormat.briefDateFormat(n.createTime),
              detailsUrl: `/news/${getSubRouteByTypeValue(n.newsType)}/${n.id}`,
              tags: n.tags,
            }}
            key={n.id}
          />
        ))}
      </Grid>
    </Page>
  );
}
