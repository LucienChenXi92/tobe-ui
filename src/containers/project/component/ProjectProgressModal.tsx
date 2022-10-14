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
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
} from "@mui/lab";
import { server, ROOT_URL, SERVER_URI } from "../../../servers";
import { ProjectProgress } from "../../../global/types";
import { useAuthState } from "../../../contexts";
import ProjectProgressItem from "./ProjectProgressItem";
import moment from "moment";

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
        enqueueSnackbar(t("project-progress.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }

  function createProgresss(): void {
    if (!newProgress.trim()) {
      enqueueSnackbar(t("project-progress.msg.warning"), {
        variant: "warning",
      });
      return;
    }

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
        enqueueSnackbar(t("project-progress.msg.success"), {
          variant: "success",
        });
        loadProgressses(props.projectId);
      })
      .catch(() => {
        enqueueSnackbar(t("project-progress.msg.error"), {
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
            <Paper
              variant="outlined"
              sx={{ mt: 2, mb: 6, p: { xs: 2, md: 3 } }}
            >
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
          <Timeline
            sx={{
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.2,
              },
              px: 0,
            }}
          >
            {progresses.map((progress: ProjectProgress) => (
              <TimelineItem key={progress.id}>
                <TimelineOppositeContent>
                  <Typography color="text.secondary" variant="body2">
                    {moment(progress.createTime).format("hh:mm a")}
                    <br />
                    {moment(progress.createTime).format("MM/DD/YYYY")}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="secondary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ pl: 1, pr: 0 }}>
                  <ProjectProgressItem
                    progress={progress}
                    viewOnly={props.viewOnly}
                    key={progress.id}
                  />
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </>
      )}
    </React.Fragment>
  );
}
