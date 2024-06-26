import { Box, Container, Grid } from "@mui/material";
import Copyright from "./CopyRight";

export default function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        paddingTop: "15px",
        paddingBottom: "10px",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container fixed>
        <Grid item md={3} xl={12}>
          <Copyright />
        </Grid>
      </Container>
    </Box>
  );
}
