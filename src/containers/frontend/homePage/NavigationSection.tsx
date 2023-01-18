import { Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TobeImageButton } from "../../../components";

export default function NavigationSection() {
  const { t } = useTranslation();
  const images: { url: string; title: string; value: string | undefined }[] = [
    {
      url: "https://images.pexels.com/photos/204511/pexels-photo-204511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: t("home-page.articles"),
      value: "ARTICLE",
    },
    {
      url: "https://images.pexels.com/photos/669986/pexels-photo-669986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: t("home-page.projects"),
      value: "PROJECT",
    },
  ];
  return images.length > 0 ? (
    <Container sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid container item xs={6} md={6} key={image.title}>
            <TobeImageButton
              imageUrl={image.url}
              title={image.title}
              handleOnClick={() => alert("敬请期待！")}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  ) : (
    <></>
  );
}
