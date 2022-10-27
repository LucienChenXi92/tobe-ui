import { styled } from "@mui/material/styles";
import { Chip, Grid } from "@mui/material";
import { TagOption } from "../../global/types";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function TagDisplayBar(props: { tags: TagOption[] }) {
  return (
    <Grid
      sx={{
        display: "flex",
        justifyContent: "start",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0,
        m: 0,
      }}
      component="ul"
    >
      {props.tags.map((data) => {
        return (
          <ListItem key={data.value}>
            <Chip label={data.label} variant="outlined" size="small" />
          </ListItem>
        );
      })}
    </Grid>
  );
}
