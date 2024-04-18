import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { Paper, Grid, TextField, Typography } from "@mui/material";
import { ProjectProgress } from "../../../../../global/types";
import { EditIconButton } from "../../../components";
import { FileService, ProjectProgressService } from "../../../../../services";
import { ImagesPanel } from "./ImagesPanel";
import { TimeFormat } from "../../../../../commons";

interface ProjectProgressItemProps {
  progress: ProjectProgress;
  viewOnly: boolean;
}

export default function ProjectProgressItem(props: ProjectProgressItemProps) {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [progress, setProgress] = useState<ProjectProgress>(props.progress);
  const [editable, setEditable] = useState<boolean>(false);
  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [progressDesc, setProgressDesc] = useState<string>(
    props.progress.description
  );

  const handleEditableChange = () => {
    if (editable) {
      handleProgresssUpdate();
    }
    setEditable(!editable);
  };

  useEffect(() => {
    loadImages();
  }, [props.progress.id]);

  function handleProgresssUpdate(): void {
    ProjectProgressService.updateProgress({
      id: progress.id,
      projectId: progress.projectId,
      description: progressDesc,
    })
      .then((response) => {
        enqueueSnackbar(t("project-detail-page.msg.success"), {
          variant: "success",
        });
        setProgress(response.data);
      })
      .catch(() => {
        enqueueSnackbar(t("project-detail-page.msg.error"), {
          variant: "error",
        });
      });
  }

  function loadImages() {
    FileService.getBySrcIdAndFileType(props.progress.id, "PROJECT_PIC").then(
      (response) => {
        let imageUrls = response.data.map(
          (f: { downloadURL: string }) => f.downloadURL
        );
        setImageURLs(imageUrls);
      }
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Grid container item xs={12}>
        <Grid item xs={12} sx={{ px: 1 }}>
          <TextField
            fullWidth
            variant="standard"
            multiline
            minRows={2}
            maxRows={20}
            disabled={!editable}
            value={progressDesc}
            onChange={(event) => setProgressDesc(event.target.value)}
          />
        </Grid>
        <ImagesPanel keyProfix={props.progress.id} imageURLs={imageURLs} />
        <Grid
          container
          item
          xs={12}
          sx={{ px: 1 }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography color="text.secondary" variant="body2">
            {TimeFormat.dateFormat(progress.createTime)}{" "}
            {TimeFormat.timeFormat(progress.createTime)}
          </Typography>
          {!props.viewOnly && (
            <EditIconButton
              editable={editable}
              handleEditableChange={handleEditableChange}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
