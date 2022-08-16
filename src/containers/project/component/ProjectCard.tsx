import { ProjectCardProps } from "../../../global/types";
import {
  Grid,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import { formatDate } from "../../../commons";
import ProjectStatusToolbar from "./ProjectStatusToolbar";

export default function ProjectCard(props: ProjectCardProps) {
  return (
    <Grid item xs={12} sm={6} xl={3} key={props.project.id}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.project.name}
          </Typography>
          <Divider />
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
              !operation?.hide?.call(null, props.project) && (
                <Button
                  key={operation.name}
                  onClick={() => operation.onClick(props.project.id)}
                  variant={operation.variant}
                  color={operation.color}
                  size="small"
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
