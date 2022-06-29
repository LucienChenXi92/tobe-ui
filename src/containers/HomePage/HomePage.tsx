import { Grid, Typography } from "@mui/material";
import { BasicLayout } from "../../components";

export default function HomePage() {
  return (
    <BasicLayout>
      <GreatingSection />
    </BasicLayout>
  );
}

function GreatingSection() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        width: "100%",
        paddingLeft: "20%",
        paddingRight: "20%",
      }}
    >
      <Grid item sm={false} md={4}></Grid>
      <Grid item sm={12} md={8}>
        <Typography variant="h1" align="right">
          To be
        </Typography>
        <Typography variant="h2" align="right">
          more than you can dream!
        </Typography>
      </Grid>
    </Grid>
  );
}
