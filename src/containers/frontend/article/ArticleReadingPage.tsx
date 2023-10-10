import { useEffect, useState } from "react";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import {
  AuthorDisplayPanel,
  RichReader,
  TagDisplayBar,
  Page,
  ContentPageMetaBar,
  ContentPageBreadcrumbsBar,
  RelevantContentPanel,
} from "../../../components";
import { ArticleDetailDTO, Domain } from "../../../global/types";
import { PublicDataService } from "../../../services";
import { URL } from "../../../routes";

export default function ArticleReadingPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [article, setArticle] = useState<ArticleDetailDTO | null>(null);

  useEffect(() => {
    function loadArticle(): void {
      setOpenLoading(true);
      PublicDataService.getArticleById(id || "")
        .then((response) => {
          setArticle(response.data);
        })
        .catch(() => {
          enqueueSnackbar(t("article-reading-page.msg.error"), {
            variant: "error",
          });
        })
        .finally(() => setOpenLoading(false));
    }
    loadArticle();
  }, [t, id, enqueueSnackbar]);

  return (
    <Page openLoading={openLoading} pageTitle={article?.title}>
      <ContentPageBreadcrumbsBar />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={9}>
          <Paper sx={{ py: 2, px: 2 }} variant="outlined">
            <Grid container>
              {article && (
                <ContentPageMetaBar
                  authorId={article.authorId}
                  authorName={article.authorName}
                  publishTime={article.publishTime}
                  viewCount={article.viewCount}
                  editLinkUrl={`/my/articles/${article.id}`}
                />
              )}

              {article?.subTitle && (
                <>
                  <Grid item xs={12} sx={{ my: 1 }} color="text.secondary">
                    <Paper
                      sx={{ py: 1, px: 1, backgroundColor: "#f3f2ef" }}
                      variant="outlined"
                    >
                      <Typography variant="subtitle2" color="text.secondary">
                        {article?.subTitle}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Divider />
                </>
              )}

              {article?.tags && (
                <Grid item xs={12} sx={{ mb: 1 }}>
                  <TagDisplayBar tags={article?.tags} />
                </Grid>
              )}

              {article?.content && (
                <Grid item xs={12} sx={{ my: 1 }}>
                  <RichReader htmlValue={article.content} />
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>

        <Grid item sm={12} md={3}>
          {article?.authorId && (
            <AuthorDisplayPanel userId={article?.authorId} />
          )}
          {article?.tags && (
            <RelevantContentPanel
              id={article.id}
              tages={article?.tags.map((i) => i.value)}
              domain={Domain.Article}
              linkUrl={URL.NEWS_ARTICLE_DETAIL}
            />
          )}
        </Grid>
      </Grid>
    </Page>
  );
}
