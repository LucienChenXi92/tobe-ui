import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Grid, Tooltip } from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import ArticleIcon from "@mui/icons-material/Article";
import { Page } from "../../../components";
import theme from "../../../theme";
import { NewsDTO } from "../../../global/types";
import { StandardNewsCard } from "./StandardNewsCard";
import { TimeFormat } from "../../../commons";
import { PublicDataService } from "../../../services";

export default function NewsPage() {
  const { t } = useTranslation();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [newsData, setNewsData] = useState<NewsDTO[]>([]);

  function getDomainIconByValue(domain: string) {
    switch (domain) {
      case "PROJECT":
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
      case "ARTICLE":
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

  useEffect(() => loadNews(), []);

  function loadNews(): void {
    setOpenLoading(true);
    PublicDataService.getAllNews()
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
              newsTypeIcon: getDomainIconByValue(n.domain),
              creater: n.ownerName,
              avatarUrl: n.avatarUrl,
              createTime: TimeFormat.briefDateFormat(n.createTime),
              updateTime: n.updateTime
                ? TimeFormat.briefDateFormat(n.updateTime)
                : null,
              publishTime: n.publishTime
                ? TimeFormat.briefDateFormat(n.publishTime)
                : TimeFormat.briefDateFormat(n.createTime),
              detailsUrl: `/news/${n.domain?.toLowerCase()}s/${n.id}`,
              tags: n.tags,
            }}
            key={n.id}
          />
        ))}
      </Grid>
    </Page>
  );
}
