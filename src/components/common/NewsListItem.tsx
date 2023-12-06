import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TagOption } from "../../global/types";
import { TagDisplayBar } from "..";
import theme from "../../theme";
import { TimeFormat } from "../../commons";

export default function NewsListItem(props: {
  owner: string;
  title: string;
  description: string;
  publishTime: string | null;
  viewCount: number;
  tags: TagOption[];
  onClick: () => void;
}) {
  const { t } = useTranslation();
  return (
    <Grid
      container
      item
      onClick={props.onClick}
      xs={12}
      sx={{
        borderBottom: "1px solid rgba(0,0,0,0.12)",
        maxHeight: "80px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        p: 2,
      }}
    >
      <Grid
        container
        item
        xs={12}
        sx={{
          cursor: "pointer",
          "&:hover": {
            color: theme.palette.secondary.main,
          },
        }}
      >
        <Typography variant="h6" sx={{ wordBreak: "break-all" }}>
          <b>{props.title}</b>
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sx={{
          my: 1,
          color: theme.palette.text.secondary,
          cursor: "pointer",
          "&:hover": {
            color: theme.palette.secondary.main,
          },
        }}
      >
        <Typography variant="body2">{props.description}</Typography>
      </Grid>
      <Grid container item xs={12}>
        <Typography variant="body2" color="text.secondary">
          {props.owner} | {TimeFormat.briefDateFormat(props.publishTime)} |{" "}
          {t("home-page.view-count")}: {props.viewCount}
        </Typography>
      </Grid>
      <Grid container item xs={12}>
        <TagDisplayBar tags={props.tags} />
      </Grid>
    </Grid>
  );
}
