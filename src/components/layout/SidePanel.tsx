import { Grid, Typography, Paper } from "@mui/material";

export default function SidePanel(props: { title: string; children: any }) {
  return (
    <Grid container component={Paper} sx={{ p: 0 }} variant="outlined">
      <Grid
        item
        xs={12}
        sx={{
          px: 2,
          py: 1.5,
          mb: 1,
          borderBottom: "1px solid rgba(0,0,0,0.12)",
        }}
      >
        <Typography color="text.secondary" variant="subtitle1">
          {props.title}
        </Typography>
      </Grid>
      {props.children}
    </Grid>
  );
}
