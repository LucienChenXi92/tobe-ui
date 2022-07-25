import { ProjectCardProps } from "../../global/types";
import {
  Grid,
  Box,
  Button,
  Typography,
  Tooltip,
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { formatDate } from "../../commons";
import { useTranslation } from "react-i18next";

export default function ProjectCard(props: ProjectCardProps) {
  const { t } = useTranslation();
  return (
    <Grid item xs={12} sm={6} xl={3} key={props.data.id}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.data.name}
          </Typography>
          <Divider />
          <Box sx={{ my: 1 }}>
            {!props.data.active && props.data.actualEndTime && (
              <Tooltip title={t("project-table.card.tooltip.closed")}>
                <CheckCircleOutlineIcon color="disabled" />
              </Tooltip>
            )}
            {props.data.active && (
              <Tooltip title={t("project-table.card.tooltip.in-process")}>
                <TimelapseIcon color="warning" />
              </Tooltip>
            )}
            {props.data.publicToAll && (
              <Tooltip title={t("project-table.card.tooltip.public-to-all")}>
                <VerifiedIcon color="info" />
              </Tooltip>
            )}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {props.data.description}
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            Planed: {formatDate(props.data.targetStartTime)}
            {" ~ "} {formatDate(props.data.targetEndTime)}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          {props.operations.map(
            (operation) =>
              !operation?.hide?.call(null, props.data) && (
                <Button
                  key={operation.name}
                  onClick={() => operation.onClick(props.data.id)}
                  variant={operation.variant}
                  color={operation.color}
                >
                  {operation.label}
                </Button>
              )
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
