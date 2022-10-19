import { useEffect, useState } from "react";
import {
  Breadcrumbs,
  Divider,
  Grid,
  Paper,
  Link,
  Typography,
} from "@mui/material";
import { useAuthState } from "../../contexts";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import Page from "../../components/Page";
import moment from "moment";
import { AuthorDisplayPanel, RichReader } from "../../components";

interface ArticleDetail {
  content: string;
  authorName: string;
  authorId: string;
  description: string;
  id: string;
  likeCount: number;
  viewCount: number;
  publicToAll: boolean;
  publishTime: string;
  subTitle: string;
  title: string;
  avatarUrl: string;
}

export default function ArticleReadingPage() {
  const { t } = useTranslation();
  const { articleId } = useParams();
  const authState = useAuthState();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [article, setArticle] = useState<ArticleDetail | null>(null);

  useEffect(() => loadArticle(), []);

  function loadArticle(): void {
    setOpenLoading(true);
    server
      .get(`${ROOT_URL}/${SERVER_URI.GET_ARTICLES}/${articleId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
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
      <Breadcrumbs aria-label="breadcrumb" sx={{ m: 1 }}>
        <Link underline="hover" color="inherit" href="/">
          {t("breadcrumbs.home")}
        </Link>
        <Link underline="hover" color="inherit" href="/news">
          {t("breadcrumbs.news")}
        </Link>
        <Typography color="text.primary">{t("breadcrumbs.content")}</Typography>
      </Breadcrumbs>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={9}>
          <Paper sx={{ py: 2, px: 2 }} variant="outlined">
            <Grid container>
              <Grid item container xs={12} sx={{ my: 1 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ flexGrow: 1 }}
                >
                  {t("article-reading-page.post-by") +
                    article?.authorName +
                    t("article-reading-page.post-at") +
                    moment(article?.publishTime).format("YYYY-MM-DD HH:mm")}
                </Typography>
                {authState?.user.id === article?.authorId && (
                  <Link href={`/my/articles/${articleId}`} sx={{ flexGrow: 0 }}>
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

              {article?.content && (
                <Grid item xs={12} sx={{ my: 1 }}>
                  <RichReader htmlValue={article.content} />
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
        {article?.authorId && (
          <Grid item sm={12} md={3}>
            <AuthorDisplayPanel userId={article?.authorId} />
          </Grid>
        )}
      </Grid>
    </Page>
  );
}
