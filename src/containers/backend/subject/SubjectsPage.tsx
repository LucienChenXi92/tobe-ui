import { useEffect, useState, useCallback } from "react";
import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../routes";
import { Operation, SubjectInfo } from "../../../global/types";
import { SubjectService } from "../../../services";
import SubjectCardView from "./SubjectCardView";
import { AddIconButton, Page } from "../components";

export default function SubjectsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [openLoading, setOpenLoading] = useState<boolean>(false);
  const [subjects, setSubjects] = useState<SubjectInfo[]>([]);
  const [current] = useState<number>(0);
  const [size] = useState<number>(1000);
  const loadData = useCallback((): void => {
    setOpenLoading(true);
    SubjectService.get(size, current)
      .then((response) => {
        setSubjects(response.data.records || []);
      })
      .catch(() => {
        enqueueSnackbar(t("articles-page.msg.error"), {
          variant: "error",
        });
      })
      .finally(() => setOpenLoading(false));
  }, [current, enqueueSnackbar, size, t]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  function releaseById(id: number | string) {
    setOpenLoading(true);
    SubjectService.releaseById(id)
      .then(() => {
        loadData();
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
        loadData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  const operations: Operation[] = [
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
          <AddIconButton onClick={() => navigate(URL.CREATE_SUBJECT)} />
        </Grid>
      </Grid>
      <SubjectCardView
        operations={operations}
        data={subjects}
        onClick={(id: number | string) =>
          navigate(URL.SUBJECT_DETAIL.replace(":id", id.toString()))
        }
      />
    </Page>
  );
}
