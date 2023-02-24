import { useState } from "react";
import { Container, Grid } from "@mui/material";
import { Domain } from "../../../global/types";
import FeaturedNews from "./FeaturedNews";
import Top5ActiveUsersPanel from "./Top5ActiveUsersPanel";
import TagStatisticsFilterPanel from "./TagStatisticsFilterPanel";

export default function FunctionSection() {
  const [checkedTags, setCheckedTags] = useState<string[]>([]);
  const [domain, setDomain] = useState<Domain>(Domain.Article);

  function handleDomainChange(newValue: Domain) {
    setCheckedTags([]);
    setDomain(newValue);
  }

  return (
    <Container sx={{ my: 3 }}>
      <Grid container spacing={1}>
        <Grid item sm={12} md={9}>
          <FeaturedNews
            tags={checkedTags}
            domain={domain}
            handleDomainChange={handleDomainChange}
          />
        </Grid>
        <Grid container item sm={false} md={3} spacing={2} direction="column">
          <Grid item>
            <TagStatisticsFilterPanel
              domain={domain}
              checked={checkedTags}
              setChecked={setCheckedTags}
            />
          </Grid>
          <Grid item>
            <Top5ActiveUsersPanel />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
