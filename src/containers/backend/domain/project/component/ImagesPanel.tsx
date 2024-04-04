import { Grid, Link } from "@mui/material";

export const ImagesPanel = (props: { imageURLs: string[] }) => (
  <Grid item container sx={{ mt: 1 }}>
    {props.imageURLs.length > 0 && (
      <Grid container>
        {props.imageURLs.map((imgURL: string) => (
          <Grid
            container
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            xl={2}
            sx={{ p: 1, border: "0.5px solid rgba(0,0,0,0.12)" }}
            key={imgURL}
          >
            <Link target="_blank" href={imgURL}>
              <img
                src={imgURL}
                alt={imgURL}
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "150px",
                }}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    )}
  </Grid>
);
