import { ReactElement, useState } from "react";
import { Container, Grid } from "@mui/material";
import { Domain } from "../../../global/types";
import { useNavigate, useSearchParams } from "react-router-dom";
import FeaturedNews from "./FeaturedNews";
import TagStatisticsFilterPanel from "./TagStatisticsFilterPanel";
import { getDomainFromPath, getPathFromDomain } from "../../../commons";

export default function FunctionSection(props: {
  availableDomains: Domain[];
  extraPanels: ReactElement[];
  ownerId: string;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [checkedTags, setCheckedTags] = useState<string[]>([]);
  const domainPath = searchParams.get("d") || "";
  const [currentDomain, setCurrentDomain] = useState<Domain>(
    getDomainFromPath(domainPath)
  );

  function handleDomainChange(newValue: Domain) {
    setCheckedTags([]);
    setCurrentDomain(newValue);
    navigate(`?d=${getPathFromDomain(newValue)}`, { replace: true });
  }

  return (
    <Container sx={{ my: 1 }}>
      {props.availableDomains && props.availableDomains.length > 0 && (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={9}>
            <FeaturedNews
              ownerId={props.ownerId}
              tags={checkedTags}
              domain={currentDomain}
              availableDomains={props.availableDomains}
              handleDomainChange={handleDomainChange}
            />
          </Grid>
          <Grid container item sm={false} md={3} spacing={1} direction="column">
            <Grid item>
              <TagStatisticsFilterPanel
                domain={currentDomain}
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
