import { Container, Box, Grid, Typography } from "@mui/material";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import theme from "../../../theme";
import "react-awesome-slider/dist/styles.css";
import "./slider.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Title = (props: any) => {
  return (
    <Box
      sx={{
        ...{ p: 2 },
        ...props.sxBody,
      }}
    >
      <Typography
        variant="h1"
        align="right"
        sx={{
          fontWeight: 600,
          fontSize: {
            xs: "2rem",
            sm: "4rem",
            md: "4rem",
            lg: "4rem",
          },
        }}
      >
        {props.main}
      </Typography>
      <Typography
        variant="h3"
        align="right"
        sx={{
          fontWeight: 600,
          fontSize: {
            xs: "2rem",
            md: "2rem",
            lg: "3rem",
          },
        }}
      >
        {props.secondary}
      </Typography>
    </Box>
  );
};

export default function GreatingSection() {
  return (
    <Container>
      <Grid
        container
        sx={{
          mt: "60px",
        }}
      >
        <AutoplaySlider
          play={true}
          cancelOnInteraction={false}
          interval={30000}
          style={{
            color: theme.palette.background.paper,
          }}
        >
          <div data-src="https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
            <Title
              main="To be a better yourself!"
              sx={{ color: theme.palette.background.paper }}
            />
          </div>
          <div data-src="https://images.pexels.com/photos/2663851/pexels-photo-2663851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
            <Title
              main="Knowledge is like a sword"
              sx={{ color: theme.palette.background.paper }}
            />
          </div>
          <div data-src="https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1">
            <Title
              main={"Health is like a shield"}
              sx={{ color: theme.palette.background.paper }}
            />
          </div>
        </AutoplaySlider>
      </Grid>
    </Container>
  );
}
