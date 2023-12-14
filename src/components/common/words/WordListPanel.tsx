import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { Box, Paper, Grid, Divider, Typography, Button } from "@mui/material";
import Add from "@mui/icons-material/Add";
import theme from "../../../theme";
import { WordGeneralDTO } from "../../../global/types";
import { WordCreateDialog } from "./WordCreateDialog";
import { WordDetailDialog } from "./WordDetailDialog";
import { WordDisplayDialog } from "./WordDisplayDialog";
import { PublicDataService, WordService } from "../../../services";

export function WordListPanel(props: {
  editable: boolean;
  vocabularyId: string;
}) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const [openedWord, setOpenedWord] = useState<WordGeneralDTO | null>(null);
  const [words, setWords] = useState<WordGeneralDTO[]>([]);

  const loadWordsData = useCallback(
    (vocabularyId: string): void => {
      PublicDataService.getWordsByVocabularyId(vocabularyId)
        .then((response) => {
          setWords(response.data);
        })
        .catch(() => {
          enqueueSnackbar(t("word-dialog.msg.error"), {
            variant: "error",
          });
        })
        .finally();
    },
    [enqueueSnackbar, t]
  );

  useEffect(
    () => loadWordsData(props.vocabularyId || ""),
    [props.vocabularyId, loadWordsData]
  );

  function handleDeleteWord(wordId: number) {
    WordService.deleteWordById(wordId)
      .then(() => {
        enqueueSnackbar(t("word-dialog.msg.success"), {
          variant: "success",
        });
        loadWordsData(props.vocabularyId || "");
        setOpenedWord(null);
      })
      .catch(() => {
        enqueueSnackbar(t("word-dialog.msg.error"), {
          variant: "error",
        });
      });
  }

  function render(words: WordGeneralDTO[]) {
    const letterSet: Set<string> = new Set(
      words.map((w) => w.word[0].toUpperCase()).sort()
    );
    const elements: JSX.Element[] = [];
    Array.from(letterSet).forEach((l) => {
      let groupedWords = words
        .filter((w) => w.word.toUpperCase().startsWith(l))
        .sort((w1, w2) => {
          if (w1.word > w2.word) {
            return 1;
          } else if (w1.word < w2.word) {
            return -1;
          } else {
            return 0;
          }
        });
      elements.push(
        <Grid item sx={{ m: 0.5 }} key={l}>
          <Typography variant="h6">{`${l} - ${groupedWords.length}`}</Typography>
          <Divider />
        </Grid>
      );
      const wordEles: JSX.Element[] = [];
      groupedWords.forEach((w) => {
        wordEles.push(
          <Grid item key={w.id} xs={6} sm={4} md={3} lg={2} xl={2}>
            <Button
              variant="text"
              onClick={() => setOpenedWord(w)}
              size="large"
              sx={{ color: theme.palette.text.secondary }}
            >
              {w.word}
            </Button>
          </Grid>
        );
      });
      props.editable &&
        wordEles.push(
          <Grid
            item
            key={"add-btn-" + l}
            flexGrow={1}
            sx={{
              opacity: 0,
              "&:hover": {
                opacity: 100,
              },
            }}
          >
            <Button
              variant="text"
              onClick={() => setOpen(true)}
              size="large"
              sx={{ color: "rgba(0,0,0,0.4)" }}
            >
              <Add />
            </Button>
          </Grid>
        );
      elements.push(
        <Grid key={"sec-" + elements.length} item container sx={{ m: 0.5 }}>
          {wordEles}
        </Grid>
      );
    });

    return elements;
  }

  return (
    <Paper variant="outlined" sx={{ my: 1, p: { xs: 2, md: 3 } }}>
      <Box justifyContent="center">
        <Grid container direction="column" sx={{ minHeight: "30vh" }}>
          {render(words)}
        </Grid>
        <WordCreateDialog
          open={open}
          setOpen={setOpen}
          vocabularyId={props.vocabularyId}
          loadData={loadWordsData}
        />
        {props.editable ? (
          <WordDetailDialog
            word={openedWord}
            setWord={setOpenedWord}
            loadData={loadWordsData}
            handleDeleteWord={handleDeleteWord}
          />
        ) : (
          <WordDisplayDialog word={openedWord} setWord={setOpenedWord} />
        )}
      </Box>
    </Paper>
  );
}
