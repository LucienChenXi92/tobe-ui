import React, { useState, useEffect } from "react";
import { Page, PagedTable } from "../../components";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import { Column, UserData, Operation } from "../../global/types";
import { useTranslation } from "react-i18next";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";

export default function ProjectsPage() {
  const [current, setCurrent] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [rows, setRows] = useState<UserData[]>([]);
  const [openLoading, setOpenLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { t } = useTranslation();

  useEffect(() => loadProjectData(), [current, size]);

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

  function deleteProjectById(id: number) {
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

  function activeProjectById(id: number) {
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

  function releaseProjectById(id: number) {
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

  function closeProjectById(id: number) {
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

  const handleDeleteProject = (id: number): void => deleteProjectById(id);

  const handleActiveProject = (id: number): void => activeProjectById(id);

  const handleCloseProject = (id: number): void => closeProjectById(id);

  const handleReleaseProjct = (id: number): void => releaseProjectById(id);

  const operations: Operation[] = [
    {
      name: "active-project",
      label: t("project-table.active-btn"),
      onClick: (id: number) => handleActiveProject(id),
      color: "success",
      hide: (data: any) => data.active || data.actualEndTime,
    },
    {
      name: "close-project",
      label: t("project-table.close-btn"),
      onClick: (id: number) => handleCloseProject(id),
      color: "warning",
      hide: (data: any) => !data.active || data.actualEndTime,
    },
    {
      name: "release",
      label: t("project-table.release-btn"),
      onClick: (id: number) => handleReleaseProjct(id),
      color: "warning",
      hide: (data: any) => data.publicToAll,
    },
    {
      name: "delete",
      label: t("project-table.delete-btn"),
      onClick: (id: number) => handleDeleteProject(id),
      color: "error",
    },
  ];

  return (
    <Page pageTitle={t("project-table.title")} openLoading={openLoading}>
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
    </Page>
  );
}

function ProjectCard() {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
