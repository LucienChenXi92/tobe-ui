import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
} from "@mui/material";
import { Operation, SubjectInfo } from "../../global/types";
import CardHeaderActionButton from "./CardHeaderActionButton";

export default function SubjectCardView(props: {
  data: SubjectInfo[];
  operations: Operation[];
  onClick?: (id: number | string) => void;
}) {
  return (
    <Grid container spacing={1}>
      {props.data.map((subject: SubjectInfo) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={subject.id}>
          <Card variant="outlined">
            <CardMedia
              sx={{ height: 140 }}
              image={subject.coverImgUrl}
              title={subject.name}
            >
              <CardHeader
                action={
                  <CardHeaderActionButton
                    data={subject}
                    operations={props.operations}
                    color={subject?.coverImgUrl?.length > 0 ? "white" : "black"}
                  />
                }
              />
            </CardMedia>
            <CardContent
              sx={{
                py: 1,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                  cursor: "pointer",
                },
              }}
              onClick={() => props.onClick && props.onClick(subject.id)}
            >
              <Typography
                gutterBottom
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  display: "block",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {subject.name}
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                color="text.secondary"
                sx={{
                  maxWidth: "100%",
                  display: "block",
                  whiteSpace: "wrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {subject.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
