import { ProjectCardProps } from "../../../../global/types";
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import { formatDate } from "../../../../commons";
import ProjectStatusToolbar from "./ProjectStatusToolbar";
import { ActionButtonBar, TagDisplayBar } from "../../../../components";

export default function ProjectCard(props: ProjectCardProps) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={props.project.id}>
      <Card variant="outlined">
        <CardHeader title={props.project.name} />
        <Divider />
        <CardContent
          sx={{
            py: 1,
          }}
        >
          <ProjectStatusToolbar project={props.project} />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              height: 60,
              whiteSpace: "wrap",
            }}
          >
            {props.project.description}
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            Planed: {formatDate(props.project.targetStartTime)}
            {" ~ "} {formatDate(props.project.targetEndTime)}
          </Typography>
          {props.project.tags.length > 0 ? (
            <TagDisplayBar tags={props.project.tags} />
          ) : (
            <Grid sx={{ height: 32 }} />
          )}
        </CardContent>

        <Divider />
        <CardActions sx={{ px: 0 }}>
          <ActionButtonBar
            operations={props.operations}
            target={props.project}
          />
        </CardActions>
      </Card>
    </Grid>
  );
}
