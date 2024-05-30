import { Container, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../routes";
import { TobeImageButton } from "./TobeImageButton";

export default function NavigationSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const images: {
    backgroundUrl: string;
    title: string;
    value: string | undefined;
    url: string;
  }[] = [
    {
      backgroundUrl:
        "https://images.pexels.com/photos/204511/pexels-photo-204511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: t("home-page.subjects"),
      value: "SUBJECT",
      url: URL.SUBJECTS_PAGE,
    },
    {
      backgroundUrl:
        "https://images.pexels.com/photos/175039/pexels-photo-175039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      title: t("home-page.tools"),
      value: "TOOL",
      url: URL.TOOLS_PAGE,
    },
  ];
  return images.length > 0 ? (
    <Container sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid container item xs={6} md={6} key={image.title}>
            <TobeImageButton
              imageUrl={image.backgroundUrl}
              title={image.title}
              handleOnClick={() => navigate(image.url)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  ) : (
    <></>
  );
}
