import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Grid,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Page, PagedTable } from "../../components";
import ProjectCard from "./component/ProjectCard";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import { Column, Operation, ProjectInfo } from "../../global/types";
import { useNavigate } from "react-router-dom";
import { URL } from "../../routes";
import { PROJECT_STATUS } from "./consts";

export default function ProjectsPage() {
  const [current, setCurrent] = useState<number>(0);
  const [size, setSize] = useState<number>(1000);
  const [rows, setRows] = useState<ProjectInfo[]>([]);
  const [openLoading, setOpenLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [cardView, setCardView] = useState<boolean>(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => loadProjectData(), [current, size, cardView]);

  const columns: readonly Column[] = [
    { id: "name", label: t("project-table.label.name"), align: "center" },
    {
      id: "targetStartTime",
      label: t("project-table.label.target-end-date"),
      format: (value) => (value ? new Date(value).toLocaleDateString() : ""),
      align: "center",
    },
    {
      id: "targetEndTime",
      label: t("project-table.label.target-end-date"),
      format: (value) => (value ? new Date(value).toLocaleDateString() : ""),
      align: "center",
    },
    {
      id: "actualStartTime",
      label: t("project-table.label.actual-start-date"),
      format: (value) => (value ? new Date(value).toLocaleDateString() : ""),
      align: "center",
    },
    {
      id: "actualEndTime",
      label: t("project-table.label.actual-end-date"),
      format: (value) => (value ? new Date(value).toLocaleDateString() : ""),
      align: "center",
    },
    {
      id: "operation",
      label: t("project-table.label.operation"),
      align: "center",
    },
  ];

  function loadProjectData() {
    setOpenLoading(true);
    server
      .get(
        `${ROOT_URL}/${SERVER_URI.GET_PROJECTS}?size=${size}&current=${
          current + 1
        }`
      )
      .then((response) => {
        setRows(response.data.records || []);
        setTotalCount(response.data.total);
        setOpenLoading(true);
      })
      .catch((error) => {})
      .finally(() => {
        setOpenLoading(false);
      });
  }

  function deleteProjectById(id: number | string) {
    setOpenLoading(true);
    server
      .delete(`${ROOT_URL}/${SERVER_URI.DELETE_PROJECT}/${id}`)
      .then(() => {
        setOpenLoading(true);
        loadProjectData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  function activeProjectById(id: number | string) {
    setOpenLoading(true);
    server
      .put(`${ROOT_URL}/${SERVER_URI.ACTIVE_PROJECT}/${id}`)
      .then(() => {
        setOpenLoading(true);
        loadProjectData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  function releaseProjectById(id: number | string) {
    setOpenLoading(true);
    server
      .put(`${ROOT_URL}/${SERVER_URI.RELEASE_PROJECT}/${id}`)
      .then(() => {
        setOpenLoading(true);
        loadProjectData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  function closeProjectById(id: number | string) {
    setOpenLoading(true);
    server
      .put(`${ROOT_URL}/${SERVER_URI.CLOSE_PROJECT}/${id}`)
      .then(() => {
        setOpenLoading(true);
        loadProjectData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  const handleChangeCurrent = (event: unknown, newPage: number): void => {
    setCurrent(newPage);
  };

  const handleChangeSize = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSize(+event.target.value);
    setCurrent(0);
  };

  const handleViewChange = (cardView: boolean): void => {
    if (cardView) {
      setSize(1000);
    } else {
      setSize(10);
    }
    setCurrent(0);
    setCardView(cardView);
  };

  const handleDeleteProject = (id: number | string): void =>
    deleteProjectById(id);

  const handleActiveProject = (id: number | string): void =>
    activeProjectById(id);

  const handleCloseProject = (id: number | string): void =>
    closeProjectById(id);

  const handleReleaseProjct = (id: number | string): void =>
    releaseProjectById(id);

  const operations: Operation[] = [
    {
      name: "view-project",
      label: t("project-table.view-detail-btn"),
      onClick: (id: number | string) =>
        navigate(URL.PROJECT_DETAIL.replace(":projectId", id.toString())),
      color: "info",
    },
    {
      name: "active-project",
      label: t("project-table.active-btn"),
      onClick: (id: number | string) => handleActiveProject(id),
      color: "success",
      hide: (data: any) =>
        ![PROJECT_STATUS.READY, PROJECT_STATUS.ON_HOLD].includes(
          data.statusValue
        ),
    },
    {
      name: "close-project",
      label: t("project-table.close-btn"),
      onClick: (id: number | string) => handleCloseProject(id),
      color: "warning",
      hide: (data: any) =>
        ![PROJECT_STATUS.IN_PROCESS].includes(data.statusValue),
    },
    {
      name: "release",
      label: t("project-table.release-btn"),
      onClick: (id: number | string) => handleReleaseProjct(id),
      color: "warning",
      hide: (data: any) => data.publicToAll,
    },
    {
      name: "delete",
      label: t("project-table.delete-btn"),
      onClick: (id: number | string) => handleDeleteProject(id),
      color: "error",
    },
  ];

  return (
    <Page pageTitle={t("project-table.title")} openLoading={openLoading}>
      <Grid
        container
        sx={{ py: 1 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Button
            color="primary"
            variant="contained"
            size="small"
            onClick={() => navigate(URL.CREATE_PROJECT, { replace: true })}
          >
            {t("project-table.create-btn")}
          </Button>
        </Grid>
        <Grid item>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={cardView}
                  onClick={() => handleViewChange(!cardView)}
                  color="secondary"
                />
              }
              label={t("project-table.card-view-btn")}
            />
          </FormGroup>
        </Grid>
      </Grid>
      {cardView ? (
        <Grid container spacing={1} sx={{ py: 1 }}>
          {rows.map((item: any) => (
            <ProjectCard operations={operations} project={item} key={item.id} />
          ))}
        </Grid>
      ) : (
        <PagedTable
          columns={columns}
          rows={rows}
          totalCount={totalCount}
          size={size}
          current={current}
          operations={operations}
          handleChangeCurrent={handleChangeCurrent}
          handleChangeSize={handleChangeSize}
        />
      )}
    </Page>
  );
}
