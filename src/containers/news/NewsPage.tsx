import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  Divider,
} from "@mui/material";
import FlagIcon from "@mui/icons-material/Flag";
import ArticleIcon from "@mui/icons-material/Article";
import { Page } from "../../components";
import { useNavigate } from "react-router-dom";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import theme from "../../theme";
import { t } from "i18next";
import moment from "moment";

interface NewsDTO {
  id: string;
  title: string;
  newsType: string;
  description: string;
  ownerName: string;
  avatarUrl: string;
  createTime: string;
  updateTime: string | null;
  publishTime: string | null;
}

export default function NewsPage() {
  const { t } = useTranslation();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [newsData, setNewsData] = useState<NewsDTO[]>([]);

  function getNewsTypeIconByValue(typeValue: string) {
    switch (typeValue) {
      case "1":
        return (
          <FlagIcon
            sx={{
              fontSize: "1.3rem",
              mr: 1,
              color: theme.palette.warning.main,
            }}
          />
        );
      case "2":
        return (
          <ArticleIcon
            sx={{ fontSize: "1.3rem", mr: 1, color: theme.palette.info.main }}
          />
        );
      default:
        return null;
    }
  }

  function getSubRouteByTypeValue(typeValue: string) {
    switch (typeValue) {
      case "1":
        return "project";
      case "2":
        return "article";
      default:
        return "";
    }
  }

  useEffect(() => loadNews(), []);

  function loadNews(): void {
    setOpenLoading(true);
    server
      .get(`${ROOT_URL}/${SERVER_URI.GET_NEWS}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setNewsData(response.data.records);
      })
      .catch(() => {})
      .finally(() => setOpenLoading(false));
  }

  function format(dateStr: string) {
    return moment(dateStr).format("YYYY-MM-DD HH:mm");
  }

  return (
    <Page pageTitle={t("news-page.page-main-title")} openLoading={openLoading}>
      <Grid container spacing={2} sx={{ py: 2 }}>
        {newsData.map((n: NewsDTO) => (
          <StandardNewsCard
            data={{
              title: n.title,
              description: n.description,
              newsTypeIcon: getNewsTypeIconByValue(n.newsType),
              creater: n.ownerName,
              avatarUrl: n.avatarUrl,
              createTime: format(n.createTime),
              updateTime: format(n.updateTime || ""),
              publishTime: n.publishTime
                ? format(n.publishTime)
                : format(n.createTime),
              detailsUrl: `/news/${getSubRouteByTypeValue(n.newsType)}/${n.id}`,
            }}
            key={n.id}
          />
        ))}
      </Grid>
    </Page>
  );
}
interface StandardNewsCardProps {
  data: News;
}

interface News {
  title: string;
  description: string;
  newsTypeIcon: any;
  creater: string;
  avatarUrl: string;
  createTime: string;
  updateTime: string;
  publishTime: string;
  detailsUrl: string;
}

const StandardNewsCard = (props: StandardNewsCardProps) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card variant="outlined" sx={{ pb: 0 }}>
        <CardHeader
          avatar={
            <Avatar alt={props.data.creater} src={props.data.avatarUrl} />
          }
          title={props.data.creater}
          subheader={t("news-page.publish-at") + props.data?.publishTime}
        />
        <Divider />
        <CardActionArea onClick={() => navigate(props.data.detailsUrl)}>
          <CardContent>
            <Typography
              variant="h6"
              component="div"
              sx={{ justifyContent: "center" }}
            >
              {props.data.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.data.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Divider />
        <CardContent sx={{ my: 0, py: 0 }}>
          <Grid container sx={{ pt: 1 }}>
            <Grid item sx={{ flexGrow: 0 }}>
              {props.data.newsTypeIcon}
            </Grid>
            <Grid item sx={{ flexGrow: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {t("news-page.update-at") + props.data?.updateTime}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
