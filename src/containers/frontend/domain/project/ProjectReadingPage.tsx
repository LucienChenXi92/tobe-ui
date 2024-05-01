import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { Page } from "../../../../components";
import { ProjectInfo } from "../../../../global/types";
import ProjectProgressModal from "../../../backend/domain/project/component/ProjectProgressModal";
import { TimeFormat } from "../../../../commons";
import { PublicDataService } from "../../../../services";
import {
  AuthorDisplayPanel,
  ContentPageMetaBar,
  ContentPageBreadcrumbsBar,
  TagDisplayBar,
  ContentPageFrame,
} from "../../components";

export default function ProjectReadingPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [openLoading, setOpenLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [project, setProject] = useState<ProjectInfo | null>(null);

  useEffect(() => {
    function loadProject(id: string): void {
      setOpenLoading(true);
      PublicDataService.getProjectById(id)
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
    loadProject(id || "");
  }, [enqueueSnackbar, t, id]);

  return (
    <Page openLoading={openLoading} pageTitle={project?.name}>
      <ContentPageBreadcrumbsBar />
      <ContentPageFrame
        mainContent={
          <Grid container>
            {project && (
              <ContentPageMetaBar
                authorId={project.ownerId}
                authorName={project.ownerName}
                publishTime={project.publishTime}
                viewCount={project.viewCount}
                editLinkUrl={`/my/projects/${project.id}`}
              />
            )}
            {project && (
              <Grid container spacing={1} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Typography color="text.secondary" variant="body2">
                    {project.description}
                  </Typography>
                </Grid>
                <Grid item container spacing={1}>
                  <TimeField
                    time={project.targetStartTime}
                    label={t("project-detail-page.fields.target-start-time")}
                  />
                  <TimeField
                    time={project.targetEndTime}
                    label={t("project-detail-page.fields.target-end-time")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TagDisplayBar tags={project.tags} />
                </Grid>
              </Grid>
            )}
          </Grid>
        }
        sideContents={[
          project?.ownerId && (
            <Grid sx={{ display: { sm: "none", md: "flex" } }}>
              <AuthorDisplayPanel userId={project?.ownerId} />
            </Grid>
          ),
        ]}
      />
      {id && <ProjectProgressModal projectId={id} viewOnly={true} />}
    </Page>
  );
}

const TimeField = (props: { time: string; label: string }) =>
  props.time ? (
    <Grid item xs={6}>
      <Typography color="text.secondary" variant="body2">
        {props.label}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        {TimeFormat.dateFormat(props.time)}
      </Typography>
    </Grid>
  ) : (
    <></>
  );
