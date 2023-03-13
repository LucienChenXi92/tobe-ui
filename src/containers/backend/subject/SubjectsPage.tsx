import { useEffect, useState, useCallback } from "react";
import {
  Typography,
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { ActionButtonBar, CreateButton, Page } from "../../../components";
import { URL } from "../../../routes";
import { Operation, SubjectInfo } from "../../../global/types";
import { SubjectService } from "../../../services";

export default function SubjectsPage() {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<SubjectInfo[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [size, setSize] = useState<number>(1000);
  const [totalCount, setTotalCount] = useState<number>(0);
  const navigate = useNavigate();

  const loadSubjects = useCallback((): void => {
    setOpenLoading(true);
    SubjectService.get(size, current)
      .then((response) => {
        setSubjects(response.data.records || []);
        setTotalCount(response.data.total);
      })
      .catch(() => {
        enqueueSnackbar(t("articles-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }, [current, enqueueSnackbar, size, t]);

  useEffect(() => {
    loadSubjects();
  }, [loadSubjects]);

  function releaseById(id: number | string) {
    setOpenLoading(true);
    SubjectService.releaseById(id)
      .then(() => {
        loadSubjects();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  function deleteById(id: number | string) {
    setOpenLoading(true);
    SubjectService.deleteById(id)
      .then(() => {
        loadSubjects();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  const operations: Operation[] = [
    {
      name: "detail",
      onClick: (id: number | string) =>
        navigate(URL.SUBJECT_DETAIL.replace(":subjectId", id.toString())),
    },
    {
      name: "release",
      onClick: (id: number | string) => releaseById(id),
      hide: (data: any) => data.publicToAll,
    },
    {
      name: "delete",
      onClick: (id: number | string) => deleteById(id),
    },
  ];

  return (
    <Page
      openLoading={openLoading}
      pageTitle={t("subjects-page.page-main-title")}
    >
      <Grid
        container
        sx={{ py: 1, minHeight: "54px" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <CreateButton handleOnClick={() => navigate(URL.CREATE_SUBJECT)} />
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        {subjects.map((subject: SubjectInfo) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={subject.id}>
            <Card variant="outlined">
              <CardMedia
                sx={{ height: 140 }}
                image={subject.coverImgUrl}
                title={subject.name}
              />

              <CardContent sx={{ py: 1 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  color="text.secondary"
                  component="div"
                >
                  {subject.name}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  {subject.description}
                </Typography>
              </CardContent>
              <Divider />
              <CardActions sx={{ px: 0 }}>
                <ActionButtonBar operations={operations} target={subject} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
