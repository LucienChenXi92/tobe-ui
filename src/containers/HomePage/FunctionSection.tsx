import { Container, Divider, Grid } from "@mui/material";
import FeaturedArticles from "./FeaturedArticles";
import Top5ActiveUsersPanel from "./Top5ActiveUsersPanel";

export default function FunctionSection() {
  return (
    <Container sx={{ my: 3 }}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={9}>
          <FeaturedArticles />
        </Grid>
        <Grid item sm={false} md={3}>
          <Top5ActiveUsersPanel />
        </Grid>
      </Grid>
    </Container>
  );
}
