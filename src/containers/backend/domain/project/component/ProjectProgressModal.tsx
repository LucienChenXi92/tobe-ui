import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import {
  Button,
  Paper,
  Grid,
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
  timelineItemClasses,
} from "@mui/lab";
import { ProjectProgress } from "../../../../../global/types";
import ProjectProgressItem from "./ProjectProgressItem";
import { TimeFormat } from "../../../../../commons";
import {
  ProjectProgressService,
  PublicDataService,
  FileService,
} from "../../../../../services";
import {
  InfiniteScrollList,
  InputFileUploadButton,
} from "../../../../../components";
import { ImagesPanel } from "./ImagesPanel";

export default function ProjectProgressModal(props: {
  projectId: string;
  viewOnly: boolean;
}) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const DEFAULT_PAGE_SIZE: number = 6;
  const [progresses, setProgresses] = useState<ProjectProgress[]>([]);
  const [newProgress, setNewProgress] = useState<string>("");
  const [images, setImages] = useState<any>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [current, setCurrent] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);

  function onImageChange(e: any) {
    setImages([...e.target.files]);
  }

  const loadProgressses = (): void => {
    setLoading(true);
    PublicDataService.getProgressesByProjectId(
      props.projectId,
      DEFAULT_PAGE_SIZE,
      current + 1
    )
      .then((response) => {
        setProgresses(progresses.concat(response.data.records));
        setCurrent(response.data.current);
        setTotalPage(response.data.pages);
      })
      .catch(() => {
        enqueueSnackbar(t("project-progress.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProgressses();
    if (images.length < 1) return;
    const newImageUrls: any = [];
    images.forEach((image: any) =>
      newImageUrls.push(URL.createObjectURL(image))
    );
    setImageURLs(newImageUrls);
  }, [props.projectId, images]);

  function handleProgressCreation(): void {
    if (!newProgress.trim()) {
      enqueueSnackbar(t("project-progress.msg.warning"), {
        variant: "warning",
      });
      return;
    }
    ProjectProgressService.createProgress({
      projectId: props.projectId,
      description: newProgress,
    })
      .then((response) => {
        if (images.length > 0) {
          return FileService.batchUpload(
            response.data.id,
            "PROJECT_PIC",
            images
          );
        }
      })
      .then((response) => {
        setNewProgress("");
        setImages([]);
        setImageURLs([]);
        enqueueSnackbar(t("project-progress.msg.success"), {
          variant: "success",
        });
        loadProgressses();
      })
      .catch(() => {
        enqueueSnackbar(t("project-progress.msg.error"), {
          variant: "error",
        });
      });
  }
  return (
    <React.Fragment>
      <Divider sx={{ mt: 2 }}>
        <Typography variant="subtitle1" color="text.secondary">
          {t("project-progress.title")}
        </Typography>
      </Divider>

      {!props.viewOnly && (
        <Paper variant="outlined" sx={{ mt: 2, mb: 2, p: { xs: 2, md: 3 } }}>
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
              <InputFileUploadButton onImageChange={onImageChange} />
              <Button
                variant="contained"
                size="small"
                onClick={handleProgressCreation}
                sx={{ ml: 1 }}
              >
                {t("project-progress.send-btn")}
              </Button>
            </Grid>
          </Grid>
          <ImagesPanel keyProfix={"new_progress"} imageURLs={imageURLs} />
        </Paper>
      )}

      <Timeline
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
          px: 0,
        }}
      >
        <InfiniteScrollList
          loading={loading}
          dataSource={progresses}
          renderItem={(progress: ProjectProgress) => (
            <TimelineItem
              key={progress.id}
              position="right"
              sx={{ width: "100%" }}
            >
              <TimelineSeparator>
                <TimelineDot color="secondary" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ pl: 1, pr: 0 }}>
                <Typography color="text.secondary" variant="body2">
                  {TimeFormat.dateFormat(progress.createTime)}{" "}
                  {TimeFormat.timeFormat(progress.createTime)}
                </Typography>
                <ProjectProgressItem
                  progress={progress}
                  viewOnly={props.viewOnly}
                  key={progress.id}
                />
              </TimelineContent>
            </TimelineItem>
          )}
          hasMore={current < totalPage}
          loadMore={loadProgressses}
        />
      </Timeline>
    </React.Fragment>
  );
}
