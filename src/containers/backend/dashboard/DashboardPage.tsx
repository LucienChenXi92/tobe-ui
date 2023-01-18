import { useState, useEffect, useCallback } from "react";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { OverviewService } from "../../../services";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VerifiedIcon from "@mui/icons-material/Verified";
import StorageIcon from "@mui/icons-material/Storage";
import { Page } from "../../../components";
import { URL } from "../../../routes";
import { Domain } from "../../../global/types";

interface BaseInfoOverview {
  totalNum: number;
  publicNum: number;
  totalViewCount: number;
}

interface ProjectInfoOverview extends BaseInfoOverview {
  ongoingNum: number;
  finishedNum: number;
}

interface ArticleInfoOverview extends BaseInfoOverview {}

export default function DashboardPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [projectData, setProjectData] = useState<ProjectInfoOverview>({
    totalNum: 0,
    publicNum: 0,
    totalViewCount: 0,
    ongoingNum: 0,
    finishedNum: 0,
  });
  const [articleData, setArticleData] = useState<ArticleInfoOverview>({
    totalNum: 0,
    publicNum: 0,
    totalViewCount: 0,
  });
  const loadOverview = useCallback(
    (domain: Domain, setData: (any: any) => void): void => {
      OverviewService.getOverviewData(domain)
        .then((response) => {
          setData(response.data);
        })
        .catch(() => {
          enqueueSnackbar(t("dashboard-page.msg.error"), {
            variant: "error",
          });
        });
    },
    [enqueueSnackbar, t]
  );
  const loadData = useCallback((): void => {
    loadOverview(Domain.Project, setProjectData);
    loadOverview(Domain.Article, setArticleData);
  }, [loadOverview]);

  useEffect(() => loadData(), [loadData]);

  return (
    <Page openLoading={false} pageTitle={t("dashboard-page.page-main-title")}>
      <SectionTitle
        value={t("dashboard-page.project.title")}
        link={URL.PROJECTS}
      />
      <Grid container spacing={2} sx={{ py: 2 }}>
        <StandardSmallWidget
          value={projectData.ongoingNum}
          label={t("dashboard-page.project.ongoing")}
          link={URL.PROJECTS}
          icon={<TimelapseIcon color="warning" sx={{ fontSize: 50 }} />}
        />
        <StandardSmallWidget
          value={projectData.publicNum}
          label={t("dashboard-page.project.public")}
          link={URL.PROJECTS}
          icon={<VerifiedIcon color="info" sx={{ fontSize: 50 }} />}
        />
        <StandardSmallWidget
          value={(projectData.totalViewCount / 1000).toFixed(1)}
          label={t("dashboard-page.project.view-count")}
          link={URL.PROJECTS}
          icon={<VisibilityIcon color="success" sx={{ fontSize: 50 }} />}
        />
        <StandardSmallWidget
          value={projectData.totalNum}
          label={t("dashboard-page.project.all")}
          link={URL.PROJECTS}
          icon={<StorageIcon color="disabled" sx={{ fontSize: 50 }} />}
        />
      </Grid>
      <SectionTitle
        value={t("dashboard-page.article.title")}
        link={URL.ARTICLES}
      />
      <Grid container spacing={2} sx={{ py: 2 }}>
        <StandardSmallWidget
          value={articleData.publicNum}
          label={t("dashboard-page.article.public")}
          link={URL.ARTICLES}
          icon={<VerifiedIcon color="info" sx={{ fontSize: 50 }} />}
        />
        <StandardSmallWidget
          value={(articleData.totalViewCount / 1000).toFixed(1)}
          label={t("dashboard-page.article.view-count")}
          link={URL.PROJECTS}
          icon={<VisibilityIcon color="success" sx={{ fontSize: 50 }} />}
        />
        <StandardSmallWidget
          value={articleData.totalNum}
          label={t("dashboard-page.article.all")}
          link={URL.ARTICLES}
          icon={<StorageIcon color="disabled" sx={{ fontSize: 50 }} />}
        />
      </Grid>
    </Page>
  );
}

interface WidgetProps {
  value: number | string;
  label: string;
  link: string;
  icon: any;
}

const SectionTitle = (props: { value: string; link: string }) => {
  const navigate = useNavigate();
  return (
    <Typography
      variant="h6"
      sx={{ mt: 3, mb: 0, cursor: "pointer", ":hover": { fontWeight: 600 } }}
      onClick={() => navigate(props.link)}
    >
      {props.value}
    </Typography>
  );
};

const StandardSmallWidget = (props: WidgetProps) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={6} sm={3}>
      <Paper
        variant="outlined"
        onClick={() => navigate(props.link)}
        sx={{ p: 2, cursor: "pointer" }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="subtitle2" flexGrow={1} color="text.secondary">
              {props.label}
            </Typography>
          </Grid>
          <Divider></Divider>
          <Grid item flexGrow={1}>
            <Typography variant="h3" color="text.secondary">
              {props.value}
            </Typography>
          </Grid>
          <Grid item flexGrow={0} alignSelf="center">
            {props.icon}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
