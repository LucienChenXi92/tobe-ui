import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { Paper, Grid, TextField, Typography } from "@mui/material";
import { server, ROOT_URL, SERVER_URI } from "../../../servers";
import { ProjectProgress } from "../../../global/types";
import { useAuthState } from "../../../contexts";
import { EditIconButton } from "../../../components";

interface ProjectProgressItemProps {
  progress: ProjectProgress;
  viewOnly: boolean;
}

export default function ProjectProgressItem(props: ProjectProgressItemProps) {
  const { t } = useTranslation();
  const context = useAuthState();
  const [progress, setProgress] = useState<ProjectProgress>(props.progress);
  const [editable, setEditable] = useState<boolean>(false);
  const [progressDesc, setProgressDesc] = useState<string>(
    props.progress.description
  );
  const { enqueueSnackbar } = useSnackbar();
  const handleEditableChange = () => {
    if (editable) {
      updateProgresss();
    }
    setEditable(!editable);
  };
  function updateProgresss(): void {
    server
      .put(
        `${ROOT_URL}/${SERVER_URI.CREATE_PROJECT_PROGRESS}/${props.progress.id}`,
        {
          id: props.progress.id,
          projectId: props.progress.projectId,
          updaterId: context.user.id,
          description: progressDesc,
        },
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
        setProgress(response.data);
      })
      .catch(() => {
        enqueueSnackbar(t("project-detail-page.msg.error"), {
          variant: "error",
        });
      });
  }
  return (
    <Paper variant="outlined" sx={{ p: { xs: 1, md: 2 } }}>
      <Grid container item xs={12}>
        {!props.viewOnly && (
          <Grid container item xs={12} justifyContent="flex-end">
            <EditIconButton
              editable={editable}
              handleEditableChange={handleEditableChange}
            />
          </Grid>
        )}
        <Grid item xs={12}>
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
      </Grid>
    </Paper>
  );
}
