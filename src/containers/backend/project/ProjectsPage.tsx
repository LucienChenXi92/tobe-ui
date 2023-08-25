import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Grid, FormGroup, FormControlLabel, Switch } from "@mui/material";
import { Page, CreateButton, GeneralTableView } from "../../../components";
import ProjectCard from "./component/ProjectCard";
import { Column, Operation, ProjectInfo } from "../../../global/types";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../routes";
import { PROJECT_STATUS } from "./consts";
import { ProjectService } from "../../../services";

export default function ProjectsPage() {
  const [current, setCurrent] = useState<number>(0);
  const [size, setSize] = useState<number>(1000);
  const [rows, setRows] = useState<ProjectInfo[]>([]);
  const [openLoading, setOpenLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [cardView, setCardView] = useState<boolean>(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const loadProjectData = useCallback((): void => {
    setOpenLoading(true);
    ProjectService.getProjects(size, current)
      .then((response) => {
        setRows(response.data.records || []);
        setTotalCount(response.data.total);
      })
      .catch((error) => {})
      .finally(() => {
        setOpenLoading(false);
      });
  }, [current, size]);

  useEffect(() => loadProjectData(), [loadProjectData]);

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

  function deleteProjectById(id: number | string) {
    setOpenLoading(true);
    ProjectService.deleteProject(id)
      .then(() => {
        loadProjectData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  function activeProjectById(id: number | string) {
    setOpenLoading(true);
    ProjectService.activeProject(id)
      .then(() => {
        loadProjectData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  function releaseProjectById(id: number | string) {
    setOpenLoading(true);
    ProjectService.releaseProject(id)
      .then(() => {
        loadProjectData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  function closeProjectById(id: number | string) {
    setOpenLoading(true);
    ProjectService.closeProject(id)
      .then(() => {
        loadProjectData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  const handleViewChange = (cardView: boolean): void => {
    if (cardView) {
      setSize(1000);
    } else {
      setSize(10);
    }
    setCurrent(0);
    setCardView(cardView);
  };

  const operations: Operation[] = [
    {
      name: "detail",
      onClick: (id: number | string) =>
        navigate(URL.PROJECT_DETAIL.replace(":id", id.toString())),
    },
    {
      name: "active",
      onClick: (id: number | string) => activeProjectById(id),
      hide: (data: any) =>
        ![PROJECT_STATUS.READY, PROJECT_STATUS.ON_HOLD].includes(
          data.statusValue
        ),
    },
    {
      name: "close",
      onClick: (id: number | string) => closeProjectById(id),
      hide: (data: any) =>
        ![PROJECT_STATUS.IN_PROCESS].includes(data.statusValue),
    },
    {
      name: "release",
      onClick: (id: number | string) => releaseProjectById(id),
      hide: (data: any) => data.publicToAll,
    },
    {
      name: "delete",
      onClick: (id: number | string) => deleteProjectById(id),
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
          <CreateButton handleOnClick={() => navigate(URL.CREATE_PROJECT)} />
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
        <Grid container spacing={1}>
          {rows.map((item: any) => (
            <ProjectCard operations={operations} project={item} key={item.id} />
          ))}
        </Grid>
      ) : (
        <GeneralTableView
          data={rows}
          operations={operations}
          columns={columns}
          size={size}
          setSize={setSize}
          current={current}
          setCurrent={setCurrent}
          totalCount={totalCount}
        />
      )}
    </Page>
  );
}
