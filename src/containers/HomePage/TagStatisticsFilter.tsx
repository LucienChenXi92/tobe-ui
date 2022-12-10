import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Domain, TagStatisticDTO } from "../../global/types";
import { server, ROOT_URL, SERVER_URI } from "../../servers";

export default function TagStatisticsFilter(props: {
  domain: Domain;
  checked: string[];
  setChecked: (newValue: string[]) => void;
}) {
  const { t } = useTranslation();
  const [tagStatistics, setTagStatistics] = useState<TagStatisticDTO[]>([]);

  const handleToggle = (value: string) => () => {
    const currentIndex = props.checked.indexOf(value);
    const newChecked = [...props.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    props.setChecked(newChecked);
  };

  useEffect(() => loadData(), [props.domain]);

  function loadData(): void {
    server
      .get(
        `${ROOT_URL}/${SERVER_URI.GET_TAG_STATISTICS}?domain=${props.domain}`
      )
      .then((response) => {
        setTagStatistics(response.data);
      })
      .catch(() => {});
  }

  console.log("render Tag");

  return tagStatistics.length > 0 ? (
    <Grid container component={Paper} sx={{ p: 0 }} variant="outlined">
      <Grid
        item
        xs={12}
        sx={{
          px: 2,
          py: 1.5,
          mb: 1,
          borderBottom: "1px solid rgba(0,0,0,0.12)",
        }}
      >
        <Typography color="text.secondary" variant="subtitle1">
          {t("home-page.tag-statistics")}
        </Typography>
      </Grid>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {tagStatistics.map((n) => {
          const labelId = `checkbox-list-label-${n.value}`;

          return (
            <ListItem key={n.value} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(n.value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={props.checked.indexOf(n.value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`${n.label}(${n.count})`}
                  color="secondary"
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Grid>
  ) : (
    <></>
  );
}
