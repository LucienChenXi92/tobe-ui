import { ProjectCardProps } from "../../../global/types";
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import { formatDate } from "../../../commons";
import ProjectStatusToolbar from "./ProjectStatusToolbar";
import { getButtonByOperationName } from "../../../components";

export default function ProjectCard(props: ProjectCardProps) {
  return (
    <Grid item xs={12} sm={6} md={3} key={props.project.id}>
      <Card variant="outlined">
        <CardHeader
          title={props.project.name}
          titleTypographyProps={{ variant: "h6" }}
        />
        <Divider />
        <CardContent>
          <ProjectStatusToolbar project={props.project} />
          <Typography variant="body2" color="text.secondary">
            {props.project.description}
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            Planed: {formatDate(props.project.targetStartTime)}
            {" ~ "} {formatDate(props.project.targetEndTime)}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions sx={{ px: 0 }}>
          {props.operations.map(
            (operation) =>
              !operation?.hide?.call(null, props.project) &&
              getButtonByOperationName(operation.name, () =>
                operation.onClick(props.project.id)
              )
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
