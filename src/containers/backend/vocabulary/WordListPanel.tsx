import { Chip, Box, Paper, Grid, Divider, Typography } from "@mui/material";
import { WordGeneralDTO } from "../../../global/types";

export function WordListPanel(props: {
  words: WordGeneralDTO[];
  setOpenedWord: (w: WordGeneralDTO) => void;
}) {
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
          <Grid
            item
            sx={{ m: 0.5 }}
            key={w.id}
            xs={6}
            sm={2}
            md={1}
            lg={1}
            xl={1}
          >
            <Chip
              label={w.word}
              variant="outlined"
              onClick={() => props.setOpenedWord(w)}
              size="medium"
            />
          </Grid>
        );
      });
      elements.push(
        <Grid item container sx={{ m: 0.5 }}>
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
          {render(props.words)}
        </Grid>
      </Box>
    </Paper>
  );
}
