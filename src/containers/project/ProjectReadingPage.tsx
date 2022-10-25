import { useState, useEffect } from "react";
import { Breadcrumbs, Grid, Paper, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { Page } from "../../components";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import { ProjectInfo } from "../../global/types";
import { AuthorDisplayPanel } from "../../components";
import ProjectStatusToolbar from "./component/ProjectStatusToolbar";
import ProjectProgressModal from "./component/ProjectProgressModal";
import moment from "moment";

export default function ProjectReadingPage() {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const [openLoading, setOpenLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [project, setProject] = useState<ProjectInfo | null>(null);

  useEffect(() => loadProject(projectId || ""), []);

  function loadProject(projectId: string): void {
    setOpenLoading(true);
    server
      .get(`${ROOT_URL}/${SERVER_URI.GET_PROJECTS}/${projectId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setProject(response.data);
      })
      .catch(() => {
        enqueueSnackbar(t("project-detail-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

  return (
    <Page openLoading={openLoading} pageTitle={project?.name}>
      <Grid container>
        <Breadcrumbs aria-label="breadcrumb" sx={{ m: 1, flexGrow: 1 }}>
          <Link underline="hover" color="inherit" href="/">
            {t("breadcrumbs.home")}
          </Link>
          <Link underline="hover" color="inherit" href="/news">
            {t("breadcrumbs.news")}
          </Link>
          <Typography color="text.primary">
            {t("breadcrumbs.content")}
          </Typography>
        </Breadcrumbs>
      </Grid>

      <Grid container spacing={1}>
        <Grid item flexGrow={1}>
          <Paper variant="outlined" sx={{ my: 0, p: { xs: 2, md: 3 } }}>
            {project && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{ flexFlow: 1 }}
                  >
                    {t("project-detail-page.fields.description")}
                  </Typography>
                  <Typography color="text.secondary" variant="body1">
                    {project.description}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Paper>
          <Paper variant="outlined" sx={{ my: 1, p: { xs: 2, md: 3 } }}>
            {project && (
              <Grid container spacing={1}>
                <TimeField
                  time={project.targetStartTime}
                  label={t("project-detail-page.fields.target-start-time")}
                />
                <TimeField
                  time={project.targetEndTime}
                  label={t("project-detail-page.fields.target-end-time")}
                />
                <TimeField
                  time={project.actualStartTime}
                  label={t("project-detail-page.fields.actual-start-time")}
                />
                <TimeField
                  time={project.actualEndTime}
                  label={t("project-detail-page.fields.actual-end-time")}
                />
              </Grid>
            )}
          </Paper>
        </Grid>

        {project?.ownerId && (
          <Grid
            item
            md={3}
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <AuthorDisplayPanel userId={project?.ownerId} />
          </Grid>
        )}
      </Grid>
      {projectId && (
        <ProjectProgressModal projectId={projectId} viewOnly={true} />
      )}
    </Page>
  );
}

const TimeField = (props: { time: string; label: string }) =>
  props.time ? (
    <Grid item xs={6}>
      <Typography color="text.secondary" variant="body2">
        {props.label}
      </Typography>
      <Typography color="text.secondary" variant="body1">
        {moment(props.time).format("YYYY-MM-DD")}
      </Typography>
    </Grid>
  ) : (
    <></>
  );
