import { Container, Grid, Paper, Typography, Tooltip } from "@mui/material";
import { UserFullProfileDTO } from "../../../global/types";
import { useTranslation } from "react-i18next";

export default function IntroducationSection(props: {
  profile: UserFullProfileDTO | null;
}) {
  const { t } = useTranslation();
  return (
    <Container sx={{ mt: "60px" }}>
      <Grid
        container
        component={Paper}
        variant="outlined"
        sx={{ minHeight: "45vh" }}
        justifyItems="start"
        alignContent="start"
      >
        <Grid
          container
          justifyContent="flex-end"
          sx={{
            height: { xs: "10vh", sm: "12vh", md: "20vh", lg: "30" },
            mb: { xs: -8, lg: -10 },
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            backgroundImage: `url(${
              props.profile?.backgroundImg ||
              "https://images.pexels.com/photos/3560168/pexels-photo-3560168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            })`,
          }}
        />
        <Grid container>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={8}
            lg={8}
            xl={8}
            direction="column"
            sx={{ px: 2, pt: 2, minHeight: "30vh" }}
          >
            <Grid
              item
              container
              sx={{
                background: "white",
                borderRadius: "70px",
                width: "140px",
                height: "140px",
                border: "5px solid white",
                backgroundImage: `url(${
                  props.profile?.photoImg || props.profile?.avatarUrl
                })`,
                backgroundRepeat: "round",
              }}
            />
            <Grid item>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600 }}
              >{`${props.profile?.firstName} ${props.profile?.lastName}`}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">{props.profile?.position}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" color="textSecondary">
                {props.profile?.address}
              </Typography>
            </Grid>
            {props.profile?.introduction && (
              <Grid item>
                <Typography
                  variant="subtitle2"
                  sx={{ mt: 1 }}
                  color="textSecondary"
                >
                  {props.profile.introduction}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="flex-end"
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
          >
            <Grid item container sx={{ mt: { sm: 2, xs: 2 } }}>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ textAlign: "center" }}
                >
                  {t("components.author-panel.public-creation-count")}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ textAlign: "center" }}
                >
                  {t("components.author-panel.view-count")}
                </Typography>
              </Grid>
              <Tooltip
                title={t("components.author-panel.public-creation-count")}
              >
                <Grid
                  item
                  xs={6}
                  sx={{ borderRight: "1px solid rgba(0,0,0,0.12)" }}
                >
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                  >
                    {props.profile?.publicCreationCount || 0}
                  </Typography>
                </Grid>
              </Tooltip>
              <Tooltip title={t("components.author-panel.view-count")}>
                <Grid item xs={6}>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ textAlign: "center" }}
                  >
                    {props.profile?.viewCount || 0}
                  </Typography>
                </Grid>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
