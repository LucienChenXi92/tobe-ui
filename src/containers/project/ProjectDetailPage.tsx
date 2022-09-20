import { useState, useEffect } from "react";
import { Box, Grid, Paper, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { Page } from "../../components";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import { ProjectInfo } from "../../global/types";
import ProjectStatusToolbar from "./component/ProjectStatusToolbar";
import ProjectProgressModal from "./component/ProjectProgressModal";
import { EditIconButton } from "../../components";

interface UpdatedProject {
  id: string;
  name: string;
  description: string;
  targetStartTime: Date | null;
  targetEndTime: Date | null;
}

interface ProjectDetailPageProp {
  viewOnly: boolean;
}

export default function ProjectDetailPage(props: ProjectDetailPageProp) {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const [openLoading, setOpenLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [editable, setEditable] = useState<boolean>(false);
  const [project, setProject] = useState<ProjectInfo | null>(null);
  const [fromTime, setFromTime] = useState<Date | null>(null);
  const [toTime, setToTime] = useState<Date | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const { viewOnly } = props;

  useEffect(() => loadProject(projectId || ""), []);

  function updateProject(updatedProject: UpdatedProject): void {
    setOpenLoading(true);
    server
      .put(
        `${ROOT_URL}/${SERVER_URI.UPDATE_PROJECT}/${updatedProject.id}`,
        updatedProject,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        enqueueSnackbar(t("project-detail-page.msg.success"), {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar(t("project-detail-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

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
        setFromTime(new Date(response.data.targetStartTime));
        setToTime(new Date(response.data.targetEndTime));
        setDescription(response.data.description);
      })
      .catch(() => {
        enqueueSnackbar(t("project-detail-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

  const handleEditableChange = () => {
    if (!project) {
      return;
    }
    if (editable) {
      updateProject({
        id: project.id,
        name: project.name,
        description: description || "",
        targetStartTime: fromTime,
        targetEndTime: toTime,
      });
    }
    setEditable(!editable);
  };

  return (
    <Page openLoading={openLoading} pageTitle={project?.name}>
      {project && (
        <Grid
          container
          sx={{ m: 0, p: { xs: 0.5, md: 1 } }}
          alignItems="center"
        >
          <Grid item flexGrow={1}>
            <ProjectStatusToolbar project={project} />
          </Grid>
          {!viewOnly && (
            <Grid item flexGrow={0}>
              <EditIconButton
                editable={editable}
                handleEditableChange={handleEditableChange}
              />
            </Grid>
          )}
        </Grid>
      )}
      <Paper sx={{ my: 0, p: { xs: 2, md: 3 } }}>
        <Box component="form" noValidate>
          {project && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label={t("project-detail-page.fields.description")}
                  fullWidth
                  autoComplete="description"
                  variant="standard"
                  multiline
                  minRows={3}
                  maxRows={20}
                  disabled={!editable}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
      <Paper sx={{ my: { xs: 2, md: 3 }, p: { xs: 2, md: 3 } }}>
        <Box component="form" noValidate>
          {project && (
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <DatePicker
                  label={t("project-detail-page.fields.target-start-time")}
                  value={fromTime}
                  onChange={(newValue) => setFromTime(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" fullWidth />
                  )}
                  disabled={!editable}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label={t("project-detail-page.fields.target-end-time")}
                  value={toTime}
                  onChange={(newValue) => setToTime(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" fullWidth />
                  )}
                  disabled={!editable}
                />
              </Grid>

              {project.actualStartTime && (
                <Grid item xs={6}>
                  <DatePicker
                    label={t("project-detail-page.fields.actual-start-time")}
                    value={project.actualStartTime}
                    onChange={() => {}}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" fullWidth />
                    )}
                    disabled={true}
                  />
                </Grid>
              )}
              {project.actualEndTime && (
                <Grid item xs={6}>
                  <DatePicker
                    label={t("project-detail-page.fields.actual-end-time")}
                    value={project.actualEndTime}
                    onChange={() => {}}
                    renderInput={(params) => (
                      <TextField {...params} variant="standard" fullWidth />
                    )}
                    disabled={true}
                  />
                </Grid>
              )}
            </Grid>
          )}
        </Box>
      </Paper>
      {projectId && (
        <ProjectProgressModal projectId={projectId} viewOnly={viewOnly} />
      )}
    </Page>
  );
}
