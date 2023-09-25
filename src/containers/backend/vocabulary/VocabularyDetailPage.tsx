import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import {
  Page,
  MultipleTagSelecter,
  EditIconButton,
  WordListPanel,
  WordDisplayDialog,
} from "../../../components";
import { WordCreateDialog } from "./WordCreateDialog";
import { Box, Button, Paper, TextField, Grid } from "@mui/material";
import { VocabularyService } from "../../../services";
import {
  VocabularyDetailDTO,
  TagOption,
  VocabularyUpdateDTO,
  WordGeneralDTO,
} from "../../../global/types";

export default function VocabularyDetailPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const [vocabulary, setVocabulary] = useState<VocabularyDetailDTO | null>(
    null
  );
  const [description, setDescription] = useState<string | null>(null);
  const [language, setLanguage] = useState<string | null>(null);
  const [tagValue, setTagValue] = useState<TagOption[]>([]);
  const [words, setWords] = useState<WordGeneralDTO[]>([]);
  const [openedWord, setOpenedWord] = useState<WordGeneralDTO | null>(null);

  const loadWordsData = useCallback(
    (vocabularyId: string): void => {
      setOpenLoading(true);
      VocabularyService.getWordsByVocabularyId(vocabularyId)
        .then((response) => {
          setWords(response.data);
        })
        .catch(() => {
          enqueueSnackbar(t("word-dialog.msg.error"), {
            variant: "error",
          });
        })
        .finally(() => setOpenLoading(false));
    },
    [enqueueSnackbar, t]
  );

  const loadData = useCallback(
    (vocabularyId: string): void => {
      setOpenLoading(true);
      VocabularyService.getById(vocabularyId)
        .then((response) => {
          setVocabulary(response.data);
          setDescription(response.data.description);
          setLanguage(response.data.language);
          setTagValue(response.data.tags);
          loadWordsData(response.data.id);
        })
        .catch(() => {
          enqueueSnackbar(t("vocabulary-detail-page.msg.error"), {
            variant: "error",
          });
        })
        .finally(() => setOpenLoading(false));
    },
    [enqueueSnackbar, t, loadWordsData]
  );

  useEffect(() => loadData(id || ""), [id, loadData]);

  function handleDeleteWord(wordId: number) {
    VocabularyService.deleteWordById(wordId)
      .then(() => {
        enqueueSnackbar(t("word-dialog.msg.success"), {
          variant: "success",
        });
        loadWordsData(id || "");
        setOpenedWord(null);
      })
      .catch(() => {
        enqueueSnackbar(t("word-dialog.msg.error"), {
          variant: "error",
        });
      });
  }

  const handleEditableChange = () => {
    if (!vocabulary) {
      return;
    }
    if (editable) {
      handleUpdate({
        id: vocabulary.id,
        title: vocabulary.title,
        description: description || "",
        language: language || "",
        tags: tagValue,
      });
    }
    setEditable(!editable);
  };

  function handleUpdate(updateDTO: VocabularyUpdateDTO): void {
    setOpenLoading(true);
    VocabularyService.update(updateDTO)
      .then((response) => {
        enqueueSnackbar(t("vocabulary-detail-page.msg.success"), {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar(t("vocabulary-detail-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

  return (
    <Page openLoading={openLoading} pageTitle={vocabulary?.title || ""}>
      {vocabulary && (
        <Grid
          container
          sx={{ my: 0, pr: { xs: 0.5, md: 1 }, py: { xs: 0.5, md: 1 } }}
          alignItems="center"
        >
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            size="small"
          >
            {t("word-dialog.add")}
          </Button>
          <WordCreateDialog
            open={open}
            setOpen={setOpen}
            vocabularyId={vocabulary.id}
            loadData={loadData}
          />
          <Grid item flexGrow={1}></Grid>
          <Grid item flexGrow={0}>
            <EditIconButton
              editable={editable}
              handleEditableChange={handleEditableChange}
            />
          </Grid>
        </Grid>
      )}
      <Paper variant="outlined" sx={{ mt: 0, mb: 1, p: { xs: 2, md: 3 } }}>
        <Box justifyContent="center">
          {vocabulary && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="language"
                  name="language"
                  label={t("vocabulary-creation-page.fields.language")}
                  fullWidth
                  autoComplete="language"
                  variant="standard"
                  disabled={!editable}
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label={t("vocabulary-creation-page.fields.description")}
                  fullWidth
                  autoComplete="description"
                  variant="standard"
                  disabled={!editable}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <MultipleTagSelecter
                  value={tagValue}
                  setValue={setTagValue}
                  disabled={!editable}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
      {id && <WordListPanel words={words} setOpenedWord={setOpenedWord} />}
      <WordDisplayDialog
        word={openedWord}
        setWord={setOpenedWord}
        handleDeleteWord={handleDeleteWord}
        editable={true}
      />
    </Page>
  );
}
