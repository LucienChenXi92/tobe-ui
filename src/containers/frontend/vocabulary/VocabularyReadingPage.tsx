import { useEffect, useState } from "react";
import { Grid, Paper, Link, Typography } from "@mui/material";
import { useAuthState } from "../../../contexts";
import { useParams, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import {
  AuthorDisplayPanel,
  TobeBreadcrumbs,
  TagDisplayBar,
  Page,
  WordListPanel,
  WordDisplayDialog,
} from "../../../components";
import {
  BreadcrumbsNode,
  VocabularyDetailDTO,
  WordGeneralDTO,
} from "../../../global/types";
import { TimeFormat } from "../../../commons";
import { PublicDataService } from "../../../services";
import { URL } from "../../../routes";

export default function VocabularyReadingPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  let [searchParams] = useSearchParams();

  const breadcrumbs: BreadcrumbsNode[] = [];
  if (searchParams.has("subjectId") && searchParams.has("subjectName")) {
    breadcrumbs.push({
      label: t("breadcrumbs.subjects"),
      href: URL.SUBJECTS_PAGE,
    });
    breadcrumbs.push({
      label: searchParams.get("subjectName") || "",
      href: URL.SUBJECT_READING_PAGE.replace(
        ":id",
        searchParams.get("subjectId") || ""
      ),
    });
  }
  const authState = useAuthState();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [vocabualry, setVocabulary] = useState<VocabularyDetailDTO | null>(
    null
  );
  const [words, setWords] = useState<WordGeneralDTO[]>([]);
  const [openedWord, setOpenedWord] = useState<WordGeneralDTO | null>(null);

  useEffect(() => {
    function loadData(): void {
      setOpenLoading(true);
      PublicDataService.getVocabularyById(id || "")
        .then((response) => {
          setVocabulary(response.data);
        })
        .then(() => PublicDataService.getWordsByVocabularyId(id || ""))
        .then((response) => {
          setWords(response.data);
        })
        .catch(() => {
          enqueueSnackbar(t("article-reading-page.msg.error"), {
            variant: "error",
          });
        })
        .finally(() => setOpenLoading(false));
    }
    loadData();
  }, [t, id, enqueueSnackbar]);

  return (
    <Page openLoading={openLoading} pageTitle={vocabualry?.title}>
      <TobeBreadcrumbs nodes={breadcrumbs} />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={9}>
          <Paper sx={{ py: 2, px: 2 }} variant="outlined">
            <Grid container>
              {vocabualry && (
                <Grid item container xs={12} sx={{ my: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ flexGrow: 1 }}
                  >
                    {vocabualry.authorName} ·{" "}
                    {TimeFormat.dateAndTimeFormat(vocabualry.publishTime)} ·{" "}
                    {t("article-reading-page.view")} {vocabualry.viewCount}
                  </Typography>
                  {authState?.user.id === vocabualry.authorId && (
                    <Link href={`/my/vocabularies/${id}`} sx={{ flexGrow: 0 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ flexGrow: 1 }}
                      >
                        {t("article-reading-page.edit-btn")}
                      </Typography>
                    </Link>
                  )}
                </Grid>
              )}

              {vocabualry?.tags && (
                <Grid item xs={12} sx={{ mb: 1 }}>
                  <TagDisplayBar tags={vocabualry?.tags} />
                </Grid>
              )}

              {vocabualry && (
                <Grid item xs={12} sx={{ my: 1 }}>
                  {id && (
                    <WordListPanel
                      words={words}
                      setOpenedWord={setOpenedWord}
                    />
                  )}
                  <WordDisplayDialog
                    word={openedWord}
                    setWord={setOpenedWord}
                    editable={false}
                    handleDeleteWord={null}
                  />
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>

        <Grid item sm={12} md={3}>
          {vocabualry?.authorId && (
            <AuthorDisplayPanel userId={vocabualry?.authorId} />
          )}
        </Grid>
      </Grid>
    </Page>
  );
}
