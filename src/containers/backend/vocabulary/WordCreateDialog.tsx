import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import {
  Button,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { VocabularyService } from "../../../services";

export function WordCreateDialog(props: {
  vocabularyId: string;
  loadData: Function;
  open: boolean;
  setOpen: Function;
}) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [word, setWord] = useState<string>("");
  const [partOfSpeech, setPartOfSpeech] = useState<string>("");
  const [meaningInChinese, setMeaningInChinese] = useState<string>("");
  const [meaningInEnglish, setMeaningInEnglish] = useState<string>("");

  function handleClose() {
    setWord("");
    setPartOfSpeech("");
    setMeaningInChinese("");
    setMeaningInEnglish("");
    props.setOpen(false);
  }

  function handleSave() {
    VocabularyService.createWord({
      vocabularyId: props.vocabularyId,
      word: word,
      partOfSpeech: partOfSpeech,
      meaningInChinese: meaningInChinese,
      meaningInEnglish: meaningInEnglish,
    })
      .then(() => {
        enqueueSnackbar(t("word-dialog.msg.success"), {
          variant: "success",
        });
        handleClose();
        props.loadData(props.vocabularyId);
      })
      .catch(() => {
        enqueueSnackbar(t("word-dialog.msg.error"), {
          variant: "error",
        });
      });
  }
  return (
    <Grid item sx={{ mb: 1 }}>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={props.open}
        onClose={handleClose}
      >
        <DialogTitle>{t("word-dialog.title")}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="word"
                label={t("word-dialog.fields.word")}
                fullWidth
                variant="standard"
                value={word}
                onChange={(e) => setWord(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                id="partOfSpeech"
                label={t("word-dialog.fields.partOfSpeech")}
                fullWidth
                variant="standard"
                value={partOfSpeech}
                onChange={(e) => setPartOfSpeech(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="meaningInChinese"
                label={t("word-dialog.fields.meaningInChinese")}
                fullWidth
                variant="standard"
                value={meaningInChinese}
                onChange={(e) => setMeaningInChinese(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                id="meaningInEnglish"
                label={t("word-dialog.fields.meaningInEnglish")}
                fullWidth
                variant="standard"
                value={meaningInEnglish}
                onChange={(e) => setMeaningInEnglish(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t("word-dialog.back")}</Button>
          <Button onClick={handleSave} variant="contained">
            {t("word-dialog.save")}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
