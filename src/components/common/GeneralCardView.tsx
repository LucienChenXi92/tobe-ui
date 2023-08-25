import {
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material";
import { Operation, GeneralCardData } from "../../global/types";
import ActionButtonBar from "./ActionButtonBar";
import TagDisplayBar from "./TagDisplayBar";

export default function GeneralCardView(props: {
  data: GeneralCardData[];
  operations: Operation[];
}) {
  return (
    <Grid container spacing={1}>
      {props.data.map((record: GeneralCardData) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={record.id}>
          <Card variant="outlined">
            <CardHeader
              title={record.title}
              subheader={
                <Typography
                  gutterBottom
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{
                    maxWidth: "100%",
                    display: "block",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                ></Typography>
              }
            />
            <Divider />
            <CardContent sx={{ py: 1 }}>
              <Typography gutterBottom variant="body2" color="text.secondary">
                {record.description}
              </Typography>
              {record.tags.length > 0 && <TagDisplayBar tags={record.tags} />}
            </CardContent>
            <Divider />
            <CardActions sx={{ px: 0 }}>
              <ActionButtonBar operations={props.operations} target={record} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
