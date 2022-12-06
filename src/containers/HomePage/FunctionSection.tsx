import { useState } from "react";
import { Container, Grid } from "@mui/material";
import FeaturedArticles from "./FeaturedArticles";
import Top5ActiveUsersPanel from "./Top5ActiveUsersPanel";
import TagStatisticsFilter from "./TagStatisticsFilter";

export default function FunctionSection() {
  const [checkedTags, setCheckedTags] = useState<string[]>([]);

  console.log("render Parent!");

  return (
    <Container sx={{ my: 3 }}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={9}>
          <FeaturedArticles tags={checkedTags} />
        </Grid>
        <Grid container item sm={false} md={3} spacing={2} direction="column">
          <Grid item>
            <Top5ActiveUsersPanel />
          </Grid>
          <Grid item>
            <TagStatisticsFilter
              checked={checkedTags}
              setChecked={setCheckedTags}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
