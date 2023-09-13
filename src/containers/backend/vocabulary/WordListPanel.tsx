import { useState } from "react";
import { Chip, Box, Paper, Grid } from "@mui/material";
import { WordGeneralDTO } from "../../../global/types";
import { WordDisplayDialog } from "./WordDisplayDialog";

export function WordListPanel(props: {
  words: WordGeneralDTO[];
  handleDelete: Function;
}) {
  const [openedWord, setOpenedWord] = useState<WordGeneralDTO | null>(null);

  function render(words: WordGeneralDTO[]) {
    return words
      .sort((w1, w2) => {
        if (w1.word > w2.word) {
          return 1;
        } else if (w1.word < w2.word) {
          return -1;
        } else {
          return 0;
        }
      })
      .map((w) => (
        <Grid item sx={{ m: 0.5 }} key={w.id}>
          <Chip
            label={w.word}
            variant="outlined"
            onClick={() => setOpenedWord(w)}
            onDelete={() => props.handleDelete(w.id)}
            size="medium"
          />
        </Grid>
      ));
  }

  return (
    <Paper variant="outlined" sx={{ my: 1, p: { xs: 2, md: 3 } }}>
      <WordDisplayDialog word={openedWord} setWord={setOpenedWord} />
      <Box justifyContent="center">
        <Grid container>
          <Grid item container direction="row" sx={{ minHeight: "30vh" }}>
            {render(props.words)}
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
