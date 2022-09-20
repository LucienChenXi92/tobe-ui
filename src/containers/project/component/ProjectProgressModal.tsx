import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import {
  Button,
  Paper,
  Grid,
  Skeleton,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import { server, ROOT_URL, SERVER_URI } from "../../../servers";
import { ProjectProgress } from "../../../global/types";
import { useAuthState } from "../../../contexts";
import ProjectProgressItem from "./ProjectProgressItem";

interface ProjectProgressModalProps {
  projectId: string;
  viewOnly: boolean;
}

export default function ProjectProgressModal(props: ProjectProgressModalProps) {
  const { t } = useTranslation();
  const context = useAuthState();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [progresses, setProgresses] = useState<ProjectProgress[]>([]);
  const [newProgress, setNewProgress] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => loadProgressses(props.projectId), []);

  function loadProgressses(projectId: string): void {
    setOpenLoading(true);
    server
      .get(
        `${ROOT_URL}/` +
          SERVER_URI.GET_PROJECT_PROGRESSES.replace(":projectId", projectId),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setProgresses(response.data.records);
      })
      .catch(() => {
        enqueueSnackbar(t("project-detail-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

  function createProgresss(): void {
    setOpenLoading(true);
    server
      .post(
        `${ROOT_URL}/${SERVER_URI.CREATE_PROJECT_PROGRESS}`,
        {
          projectId: props.projectId,
          updaterId: context.user.id,
          description: newProgress,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setNewProgress("");
        loadProgressses(props.projectId);
      })
      .catch(() => {
        enqueueSnackbar(t("project-detail-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

  return (
    <React.Fragment>
      {openLoading ? (
        <Skeleton width="100%" height="30vh" />
      ) : (
        <>
          <Divider>
            <Typography variant="subtitle1" color="gray">
              {t("project-progress.title")}
            </Typography>
          </Divider>

          {!props.viewOnly && (
            <Paper sx={{ mt: 2, mb: 6, p: { xs: 2, md: 3 } }}>
              <Grid container item xs={12}>
                <Grid item xs={12}>
                  <TextField
                    id="add-progress-desc"
                    label={t("project-progress.add-new-tip")}
                    fullWidth
                    variant="outlined"
                    multiline
                    minRows={3}
                    maxRows={20}
                    value={newProgress}
                    onChange={(event) => {
                      if (event.target.value.length <= 1000) {
                        setNewProgress(event.target.value);
                      }
                    }}
                  />
                </Grid>
                <Grid item container xs={12} justifyContent="flex-end">
                  <Typography variant="body2" color="gray">
                    {Number(newProgress?.length)} / 1000
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  xs={12}
                  justifyContent="flex-end"
                  sx={{ mt: 1 }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    onClick={createProgresss}
                  >
                    {t("project-progress.send-btn")}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          )}
          {progresses.map((progress: ProjectProgress) => (
            <ProjectProgressItem
              progress={progress}
              viewOnly={props.viewOnly}
              key={progress.id}
            />
          ))}
        </>
      )}
    </React.Fragment>
  );
}
