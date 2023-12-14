import { useEffect, useState, useCallback } from "react";
import { Grid, Paper } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import {
  AuthorDisplayPanel,
  TagDisplayBar,
  Page,
  WordListPanel,
  ContentPageMetaBar,
  ContentPageBreadcrumbsBar,
  RelevantContentPanel,
} from "../../../components";
import { Domain, VocabularyDetailDTO } from "../../../global/types";
import { PublicDataService } from "../../../services";
import { URL } from "../../../routes";

export default function VocabularyReadingPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [vocabualry, setVocabulary] = useState<VocabularyDetailDTO | null>(
    null
  );

  const loadData = useCallback((): void => {
    setOpenLoading(true);
    PublicDataService.getVocabularyById(id || "")
      .then((response) => {
        setVocabulary(response.data);
      })
      .catch(() => {
        enqueueSnackbar(t("article-reading-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }, [enqueueSnackbar, t, id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Page openLoading={openLoading} pageTitle={vocabualry?.title}>
      <ContentPageBreadcrumbsBar />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={9}>
          <Paper sx={{ py: 2, px: 2 }} variant="outlined">
            <Grid container>
              {vocabualry && (
                <ContentPageMetaBar
                  authorId={vocabualry.authorId}
                  authorName={vocabualry.authorName}
                  publishTime={vocabualry.publishTime}
                  viewCount={vocabualry.viewCount}
                  editLinkUrl={`/my/vocabularies/${vocabualry.id}`}
                />
              )}

              {vocabualry?.tags && (
                <Grid item xs={12} sx={{ mb: 1 }}>
                  <TagDisplayBar tags={vocabualry?.tags} />
                </Grid>
              )}

              {vocabualry && (
                <Grid item xs={12} sx={{ my: 1 }}>
                  {id && <WordListPanel editable={false} vocabularyId={id} />}
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>

        <Grid item sm={12} md={3}>
          {vocabualry?.authorId && (
            <AuthorDisplayPanel userId={vocabualry?.authorId} />
          )}
          {vocabualry?.tags && (
            <RelevantContentPanel
              id={vocabualry.id}
              tages={vocabualry?.tags.map((i) => i.value)}
              domain={Domain.Vocabulary}
              linkUrl={URL.NEWS_VOCABULARY_DETAIL}
            />
          )}
        </Grid>
      </Grid>
    </Page>
  );
}
