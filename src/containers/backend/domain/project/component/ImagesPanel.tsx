import { Grid, Link } from "@mui/material";

export const ImagesPanel = (props: {
  keyProfix: string;
  imageURLs: string[];
}) => (
  <Grid container sx={{ mt: 1 }}>
    {props.imageURLs.length > 0 && (
      <Grid container sx={{ width: "100%" }}>
        {props.imageURLs.map((imgURL: string, index: number) => (
          <Grid item xl={3} lg={3} md={4} sm={6} xs={12} sx={{ p: 1 }}>
            <Link
              key={`${props.keyProfix}_img_${index}`}
              target="_blank"
              href={imgURL}
            >
              <Grid
                container
                sx={{
                  border: "0.5px solid rgba(0,0,0,0.12)",
                  backgroundImage: `url(${imgURL})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center 40%",
                  height: "200px",
                  width: "100%",
                  p: 1,
                }}
                key={imgURL}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    )}
  </Grid>
);
