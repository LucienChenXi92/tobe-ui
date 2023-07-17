import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Page } from "../../../components";
import { Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import { URL } from "../../../routes";

interface ToolItem {
  name: string;
  url: string;
  img: string;
  desc: string;
}

export default function ToolsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const tools: ToolItem[] = [
    {
      name: t("tools-list-page.pomodoro.name"),
      url: URL.TOOL_POMODORO,
      img: "https://images.pexels.com/photos/3938343/pexels-photo-3938343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      desc: t("tools-list-page.pomodoro.desc"),
    },
    {
      name: t("tools-list-page.time-converter.name"),
      url: URL.TOOL_TIME_CONVERTER,
      img: "https://images.pexels.com/photos/8327971/pexels-photo-8327971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      desc: t("tools-list-page.time-converter.desc"),
    },
  ];

  return (
    <Page openLoading={false} pageTitle={t("tools-list-page.page-main-title")}>
      <Grid
        container
        spacing={1}
        sx={{
          pt: 2,
        }}
      >
        {tools.map((tool: ToolItem) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={tool.name}
            sx={{
              cursor: "pointer",
            }}
          >
            <Card variant="outlined" onClick={() => navigate(tool.url)}>
              <CardMedia
                sx={{ height: 140 }}
                image={tool.img}
                title={tool.name}
              />
              <CardContent sx={{ py: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  color="text.secondary"
                  component="div"
                >
                  {tool.name}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  {tool.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
