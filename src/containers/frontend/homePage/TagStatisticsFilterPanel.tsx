import { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Domain, TagStatisticDTO } from "../../../global/types";
import { SidePanel } from "../../../components";
import { getTagStatistics } from "../../../services/PublicDataService";

export default function TagStatisticsFilterPanel(props: {
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
    getTagStatistics(props.domain)
      .then((response) => {
        setTagStatistics(response.data);
      })
      .catch(() => {});
  }

  return tagStatistics.length > 0 ? (
    <SidePanel title={t("home-page.tag-statistics")}>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {tagStatistics.map((n) => {
          const labelId = `checkbox-list-label-${n.value}`;

          return (
            <ListItem key={n.value} sx={{ py: 0 }}>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(n.value)}
                dense
                color="text.secondary"
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
                  sx={{
                    color: "text.secondary",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </SidePanel>
  ) : (
    <></>
  );
}
