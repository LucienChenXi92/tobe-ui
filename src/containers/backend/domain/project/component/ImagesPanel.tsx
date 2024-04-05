import { Grid, Link } from "@mui/material";

export const ImagesPanel = (props: { imageURLs: string[] }) => (
  <Grid item container sx={{ mt: 1 }}>
    {props.imageURLs.length > 0 && (
      <Grid container sx={{ width: "100%" }}>
        {props.imageURLs.map((imgURL: string) => (
          <Link target="_blank" href={imgURL}>
            <Grid
              container
              sx={{
                border: "0.5px solid rgba(0,0,0,0.12)",
                backgroundImage: `url(${imgURL})`,
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                height: "200px",
                width: "275px",
                p: 1,
              }}
              key={imgURL}
            />
          </Link>
        ))}
      </Grid>
    )}
  </Grid>
);
