import React, { useCallback, useEffect, useState } from "react";
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
import { ProjectProgress } from "../../../../global/types";
import ProjectProgressItem from "./ProjectProgressItem";
import { TimeFormat } from "../../../../commons";
import { ProjectService, PublicDataService } from "../../../../services";

interface ProjectProgressModalProps {
  projectId: string;
  viewOnly: boolean;
}

export default function ProjectProgressModal(props: ProjectProgressModalProps) {
  const { t } = useTranslation();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [progresses, setProgresses] = useState<ProjectProgress[]>([]);
  const [newProgress, setNewProgress] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  const loadProgressses = useCallback(
    (projectId: string): void => {
      setOpenLoading(true);
      PublicDataService.getProgressesByProjectId(projectId)
        .then((response) => {
          setProgresses(response.data.records);
        })
        .catch(() => {
          enqueueSnackbar(t("project-progress.msg.error"), {
            variant: "error",
          });
        })
        .finally(() => setOpenLoading(false));
    },
    [enqueueSnackbar, t]
  );

  useEffect(
    () => loadProgressses(props.projectId),
    [loadProgressses, props.projectId]
  );

  function handleProgressCreation(): void {
    if (!newProgress.trim()) {
      enqueueSnackbar(t("project-progress.msg.warning"), {
        variant: "warning",
      });
      return;
    }

    setOpenLoading(true);
    ProjectService.createProgress({
      projectId: props.projectId,
      description: newProgress,
    })
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
            <Typography variant="subtitle1" color="text.secondary">
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
                    onClick={handleProgressCreation}
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
                    {TimeFormat.timeFormat(progress.createTime)}
                    <br />
                    {TimeFormat.dateFormat(progress.createTime)}
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