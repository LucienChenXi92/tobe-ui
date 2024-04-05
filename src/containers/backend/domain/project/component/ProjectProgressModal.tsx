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
import { InputFileUpload } from "../../../../../components";
import { ImagesPanel } from "./ImagesPanel";

export default function ProjectProgressModal(props: {
  projectId: string;
  viewOnly: boolean;
}) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const DEFAULT_PAGE_SIZE: number = 6;
  let GLOBAL_DATA: ProjectProgress[] = [];
  let GLOBAL_CURRENT: number = 0;
  let FINISH_FLAG: boolean = true;
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [progresses, setProgresses] = useState<ProjectProgress[]>([]);
  const [newProgress, setNewProgress] = useState<string>("");
  const [images, setImages] = useState<any>([]);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [current, setCurrent] = useState<number>(GLOBAL_CURRENT);
  const [totalPage, setTotalPage] = useState<number>(1);

  function onImageChange(e: any) {
    setImages([...e.target.files]);
  }

  const handleScroll = () => {
    if (
      FINISH_FLAG &&
      document.documentElement.scrollHeight <=
        document.documentElement.clientHeight +
          document.documentElement.scrollTop
    ) {
      loadProgressses(props.projectId, GLOBAL_DATA, GLOBAL_CURRENT);
    }
  };

  const loadProgressses = useCallback(
    (projectId: string, _data: ProjectProgress[], _current: number): void => {
      FINISH_FLAG = false;
      setOpenLoading(true);
      PublicDataService.getProgressesByProjectId(
        projectId,
        DEFAULT_PAGE_SIZE,
        GLOBAL_CURRENT
      )
        .then((response) => {
          GLOBAL_DATA = _data.concat(response.data.records);
          GLOBAL_CURRENT = response.data.current;
          setProgresses(GLOBAL_DATA);
          setCurrent(GLOBAL_CURRENT);
          setTotalPage(response.data.pages);
        })
        .catch(() => {
          enqueueSnackbar(t("project-progress.msg.error"), {
            variant: "error",
          });
        })
        .finally(() => {
          FINISH_FLAG = true;
          setOpenLoading(false);
        });
    },
    [enqueueSnackbar, t]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    loadProgressses(props.projectId, progresses, current);
    if (images.length < 1) return;
    const newImageUrls: any = [];
    images.forEach((image: any) =>
      newImageUrls.push(URL.createObjectURL(image))
    );
    setImageURLs(newImageUrls);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [images, loadProgressses, props.projectId]);

  function handleProgressCreation(): void {
    if (!newProgress.trim()) {
      enqueueSnackbar(t("project-progress.msg.warning"), {
        variant: "warning",
      });
      return;
    }

    setOpenLoading(true);
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
        loadProgressses(props.projectId, progresses, current);
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
      {/* {openLoading ? (
        <Skeleton width="100%" height="30vh" />
      ) : (
        <> */}
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
            <Grid item container xs={12} sx={{ mt: 1 }}>
              <Grid flexGrow={0}>
                <InputFileUpload onImageChange={onImageChange} />
              </Grid>
              <Grid flexGrow={1} />
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
          <ImagesPanel imageURLs={imageURLs} />
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
        {progresses.map((progress: ProjectProgress) => (
          <TimelineItem key={progress.id} position="right">
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
        ))}
      </Timeline>
      <Grid sx={{ mt: 1 }} container justifyContent="center">
        {current + 1 >= totalPage && (
          <Typography variant="body2" color="textSecondary">
            {t("domain-page.msg.info-no-more")}
          </Typography>
        )}
      </Grid>
      {/* </> */}
      {/* )} */}
    </React.Fragment>
  );
}
