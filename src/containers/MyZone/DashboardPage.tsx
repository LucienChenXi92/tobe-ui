import { useState, useEffect } from "react";
import { Divider, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import VerifiedIcon from "@mui/icons-material/Verified";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import StorageIcon from "@mui/icons-material/Storage";
import Page from "../../components/Page";
import { URL } from "../../routes";

interface ProjectInfoOverview {
  totalNum: number;
  publicProjectNum: number;
  ongoingProjectNum: number;
  finishedProjectNum: number;
}

export default function DashboardPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [projectData, setProjectData] = useState<ProjectInfoOverview>({
    totalNum: 0,
    publicProjectNum: 0,
    ongoingProjectNum: 0,
    finishedProjectNum: 0,
  });
  useEffect(() => loadProjects, []);

  function loadProjects(): void {
    setOpenLoading(true);
    server
      .get(`${ROOT_URL}/${SERVER_URI.GET_PROJECT_OVERVIEW}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setProjectData(response.data);
      })
      .catch(() => {
        enqueueSnackbar(t("dashboard-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

  return (
    <Page
      openLoading={openLoading}
      pageTitle={t("dashboard-page.page-main-title")}
    >
      <Grid container spacing={2} sx={{ py: 2 }}>
        <StandardSmallWidget
          value={projectData.ongoingProjectNum}
          label={t("dashboard-page.project.ongoing")}
          link={URL.PROJECTS}
          icon={<TimelapseIcon color="warning" sx={{ fontSize: 50 }} />}
        />
        <StandardSmallWidget
          value={projectData.publicProjectNum}
          label={t("dashboard-page.project.public")}
          link={URL.PROJECTS}
          icon={<VerifiedIcon color="info" sx={{ fontSize: 50 }} />}
        />
        <StandardSmallWidget
          value={projectData.finishedProjectNum}
          label={t("dashboard-page.project.finished")}
          link={URL.PROJECTS}
          icon={<TaskAltIcon color="success" sx={{ fontSize: 50 }} />}
        />
        <StandardSmallWidget
          value={projectData.totalNum}
          label={t("dashboard-page.project.all")}
          link={URL.PROJECTS}
          icon={<StorageIcon color="disabled" sx={{ fontSize: 50 }} />}
        />
      </Grid>
    </Page>
  );
}

interface WidgetProps {
  value: number;
  label: string;
  link: string;
  icon: any;
}

const StandardSmallWidget = (props: WidgetProps) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={6} sm={3}>
      <Paper
        onClick={() => navigate(props.link)}
        sx={{ p: 2, cursor: "pointer" }}
      >
        <Grid container>
          <Grid item flexGrow={1}>
            <Typography variant="subtitle2" flexGrow={1} color="text.secondary">
              {props.label}
            </Typography>
            <Typography variant="h3" color="text.secondary">
              {props.value}
            </Typography>
          </Grid>
          <Divider></Divider>
          <Grid item flexGrow={0} alignSelf="center">
            {props.icon}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
