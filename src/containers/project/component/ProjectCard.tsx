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
import { getButtonByOperationName, TagDisplayBar } from "../../../components";

export default function ProjectCard(props: ProjectCardProps) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={props.project.id}>
      <Card variant="outlined">
        <CardHeader
          title={props.project.name}
          titleTypographyProps={{ variant: "h6" }}
        />
        <Divider />
        <CardContent sx={{ py: 1 }}>
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
        {props.project.tags.length > 0 && (
          <>
            <CardContent sx={{ py: 1 }}>
              <TagDisplayBar tags={props.project.tags} />
            </CardContent>
            <Divider />
          </>
        )}
        <CardActions sx={{ px: 0 }}>
          {props.operations.map(
            (operation, index) =>
              !operation?.hide?.call(null, props.project) &&
              getButtonByOperationName(
                operation.name,
                () => operation.onClick(props.project.id),
                `${operation.name}_${index}`
              )
          )}
        </CardActions>
      </Card>
    </Grid>
  );
}
