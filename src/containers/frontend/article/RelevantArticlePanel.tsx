import { useEffect, useState, useCallback } from "react";
import { SidePanel } from "../../../components";
import { useTranslation } from "react-i18next";
import { NewsDTO, Domain } from "../../../global/types";
import { PublicDataService } from "../../../services";
import { Grid, Typography, Link } from "@mui/material";
import { URL } from "../../../routes";

export default function RelevantArticlePanel(props: {
  articleId: string;
  tages: string[];
}) {
  const { t } = useTranslation();
  const [article, setArticle] = useState<NewsDTO[]>([]);

  const loadData = useCallback((id: string, tags: string[]): void => {
    PublicDataService.getNewsByTags(Domain.Article, 100, 1, tags)
      .then((response) => {
        setArticle(response.data.records.filter((n: NewsDTO) => n.id !== id));
      })
      .catch((err) => {
        console.error("Error happens when fetch relevant articles", err);
      });
  }, []);

  useEffect(
    () => loadData(props.articleId, props.tages),
    [loadData, props.articleId, props.tages]
  );

  return article.length > 0 ? (
    <SidePanel title={t("article-reading-page.relevant-articles")}>
      {article.map((item) => (
        <Grid item xs={12} sx={{ px: 2, py: 1 }} key={item.id}>
          <Typography variant="subtitle2" color="text.secondary">
            <Link
              href={URL.NEWS_ARTICLE_DETAIL.replace(":id", item.id)}
              target="_blank"
              color="text.secondary"
            >
              {item.title}
            </Link>
          </Typography>
        </Grid>
      ))}
    </SidePanel>
  ) : (
    <></>
  );
}
