import { useEffect, useState, useCallback } from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { Page, WordListPanel } from "../../../../components";
import { Domain, VocabularyDetailDTO } from "../../../../global/types";
import { PublicDataService } from "../../../../services";
import { URL } from "../../../../routes";
import {
  AuthorDisplayPanel,
  ContentPageBreadcrumbsBar,
  ContentPageMetaBar,
  ContentPageFrame,
  RelevantContentPanel,
  TagDisplayBar,
} from "../../components";

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
      <ContentPageFrame
        mainContent={
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
        }
        sideContents={[
          vocabualry?.authorId && (
            <Grid key="side-1" sx={{ display: { xs: "none", sm: "contents" } }}>
              <AuthorDisplayPanel userId={vocabualry?.authorId} />
            </Grid>
          ),
          vocabualry?.tags && (
            <RelevantContentPanel
              key="side-2"
              id={vocabualry.id}
              tages={vocabualry?.tags.map((i) => i.value)}
              domain={Domain.Vocabulary}
              linkUrl={URL.NEWS_VOCABULARY_DETAIL}
            />
          ),
        ]}
      />
    </Page>
  );
}
