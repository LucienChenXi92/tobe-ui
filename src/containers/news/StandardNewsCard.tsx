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
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  updateTime: string | null;
  publishTime: string;
  detailsUrl: string;
}

export const StandardNewsCard = (props: StandardNewsCardProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
            {props.data?.updateTime && (
              <Grid item sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {t("news-page.update-at") + props.data.updateTime}
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
