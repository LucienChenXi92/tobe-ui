import { ReactElement, useState } from "react";
import { Container, Grid } from "@mui/material";
import { Domain } from "../../../global/types";
import FeaturedNews from "./FeaturedNews";
import TagStatisticsFilterPanel from "./TagStatisticsFilterPanel";

export default function FunctionSection(props: {
  availableDomains: Domain[];
  extraPanels: ReactElement[];
  ownerId: string;
}) {
  const [checkedTags, setCheckedTags] = useState<string[]>([]);
  const [domain, setDomain] = useState<Domain>(Domain.Article);

  function handleDomainChange(newValue: Domain) {
    setCheckedTags([]);
    setDomain(newValue);
  }

  return (
    <Container sx={{ my: 1 }}>
      {props.availableDomains && props.availableDomains.length > 0 && (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={9}>
            <FeaturedNews
              ownerId={props.ownerId}
              tags={checkedTags}
              domain={domain}
              availableDomains={props.availableDomains}
              handleDomainChange={handleDomainChange}
            />
          </Grid>
          <Grid container item sm={false} md={3} spacing={1} direction="column">
            <Grid item>
              <TagStatisticsFilterPanel
                domain={domain}
                checked={checkedTags}
                setChecked={setCheckedTags}
                ownerId={props.ownerId}
              />
            </Grid>
            {props.extraPanels.map((c, i) => (
              <Grid item key={`side-panel-${i}`}>
                {c}
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
