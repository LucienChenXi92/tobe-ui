import { useEffect, useState } from "react";
import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import Page from "../../components/Page";
import moment from "moment";

interface ArticleDetail {
  content: string;
  creatorName: string;
  description: string;
  id: string;
  likeCount: number;
  viewCount: number;
  publicToAll: boolean;
  publishTime: string;
  subTitle: string;
  title: string;
}

export default function ArticleReadingPage() {
  const { t } = useTranslation();
  const { articleId } = useParams();
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
      <Grid container sx={{ py: 2 }}>
        <Grid item xs={12} sx={{ my: 1 }} color="text.secondary">
          <Typography variant="h6">{article?.subTitle}</Typography>
        </Grid>
        <Divider />
        <Grid item xs={12} sx={{ my: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {t("article-reading-page.post-by") +
              article?.creatorName +
              t("article-reading-page.post-at") +
              moment(article?.publishTime).format("YYYY-MM-DD HH:mm")}
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ my: 1 }}>
          <Paper sx={{ py: 2, px: 2 }} variant="outlined">
            <Typography variant="body2" color="text.secondary">
              <div
                dangerouslySetInnerHTML={{ __html: article?.content || "" }}
              />
            </Typography>
          </Paper>
        </Grid>
        <Grid container item xs={12} sx={{ my: 1, justifyContent: "flex-end" }}>
          <Button onClick={() => window.history.back()}>
            {t("article-reading-page.back-btn")}
          </Button>
        </Grid>
      </Grid>
    </Page>
  );
}
