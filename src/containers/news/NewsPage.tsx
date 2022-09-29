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
import { Page } from "../../components";
import { useNavigate } from "react-router-dom";
import { server, ROOT_URL, SERVER_URI } from "../../servers";

interface NewsDTO {
  id: string;
  name: string;
  description: string;
  ownerName: string;
  avatarUrl: string;
  statusValue: number;
  targetStartTime: string;
}

export default function NewsPage() {
  const { t } = useTranslation();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [newsData, setNewsData] = useState<NewsDTO[]>([]);

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

  return (
    <Page pageTitle={t("news-page.page-main-title")} openLoading={openLoading}>
      <Grid container spacing={2} sx={{ py: 2 }}>
        {newsData.map((n: NewsDTO) => (
          <StandardNewsCard
            data={{
              name: n.name,
              description: n.description,
              creater: n.ownerName,
              avatarUrl: n.avatarUrl,
              createTime: new Date(n.targetStartTime),
              detailsUrl: "/news/" + n.id,
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
  name: string;
  description: string;
  creater: string;
  avatarUrl: string;
  createTime: Date;
  detailsUrl: string;
}

const StandardNewsCard = (props: StandardNewsCardProps) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card>
        <CardHeader
          avatar={
            <Avatar alt={props.data.creater} src={props.data.avatarUrl} />
          }
          title={props.data.creater}
          subheader={props.data.createTime.toDateString()}
        />
        <CardActionArea onClick={() => navigate(props.data.detailsUrl)}>
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {props.data.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.data.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
