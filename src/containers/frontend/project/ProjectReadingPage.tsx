import { useState, useEffect } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import {
  AuthorDisplayPanel,
  NewsBreadcrumbs,
  Page,
  TagDisplayBar,
} from "../../../components";
import { ProjectInfo } from "../../../global/types";
import ProjectProgressModal from "../../backend/project/component/ProjectProgressModal";
import { TimeFormat } from "../../../commons";
import { PublicDataService } from "../../../services";

export default function ProjectReadingPage() {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const [openLoading, setOpenLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [project, setProject] = useState<ProjectInfo | null>(null);

  useEffect(() => {
    function loadProject(projectId: string): void {
      setOpenLoading(true);
      PublicDataService.getProjectById(projectId)
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
    loadProject(projectId || "");
  }, [enqueueSnackbar, t, projectId]);

  return (
    <Page openLoading={openLoading} pageTitle={project?.name}>
      <NewsBreadcrumbs />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={9} lg={9}>
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
                <Grid item xs={12}>
                  <TagDisplayBar tags={project.tags} />
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
        {TimeFormat.dateFormat(props.time)}
      </Typography>
    </Grid>
  ) : (
    <></>
  );
