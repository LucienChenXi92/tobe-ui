import { useEffect, useState } from "react";
import { Divider, Grid, Paper, Link, Typography } from "@mui/material";
import { useAuthState } from "../../../contexts";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { Page } from "../../../components";
import {
  AuthorDisplayPanel,
  NewsBreadcrumbs,
  RichReader,
  TagDisplayBar,
} from "../../../components";
import { ArticleDetailDTO } from "../../../global/types";
import { TimeFormat } from "../../../commons";
import { PublicDataService } from "../../../services";
import RelevantArticlePanel from "./RelevantArticlePanel";

export default function ArticleReadingPage() {
  const { t } = useTranslation();
  const { articleId } = useParams();
  const authState = useAuthState();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [article, setArticle] = useState<ArticleDetailDTO | null>(null);

  useEffect(() => loadArticle(), []);

  function loadArticle(): void {
    setOpenLoading(true);
    PublicDataService.getArticleById(articleId || "")
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

  return (
    <Page openLoading={openLoading} pageTitle={article?.title}>
      <NewsBreadcrumbs />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={9}>
          <Paper sx={{ py: 2, px: 2 }} variant="outlined">
            <Grid container>
              {article && (
                <Grid item container xs={12} sx={{ my: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flexGrow: 1 }}
                  >
                    {article.authorName} ·{" "}
                    {TimeFormat.dateAndTimeFormat(article.publishTime)} ·{" "}
                    {t("article-reading-page.view")} {article.viewCount}
                  </Typography>
                  {authState?.user.id === article.authorId && (
                    <Link
                      href={`/my/articles/${articleId}`}
                      sx={{ flexGrow: 0 }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ flexGrow: 1 }}
                      >
                        Edit
                      </Typography>
                    </Link>
                  )}
                </Grid>
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
            <RelevantArticlePanel
              articleId={article.id}
              tages={article?.tags.map((i) => i.value)}
            />
          )}
        </Grid>
      </Grid>
    </Page>
  );
}
