import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Page,
  GeneralTableView,
  GeneralCardView,
  GeneralListPageFunctionBar,
} from "../../../components";
import { Column, Operation, ProjectInfo, GeneralCardData } from "../../../global/types";
import { useNavigate } from "react-router-dom";
import { URL } from "../../../routes";
import { PROJECT_STATUS } from "./consts";
import { ProjectService } from "../../../services";
import { TimeFormat } from "../../../commons";
import moment from "moment";

export default function ProjectsPage() {
  const [current, setCurrent] = useState<number>(0);
  const [size, setSize] = useState<number>(1000);
  const [rows, setRows] = useState<ProjectInfo[]>([]);
  const [openLoading, setOpenLoading] = useState(false);
  const [cardView, setCardView] = useState<boolean>(true);
  const [recentOnly, setRecentOnly] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>("");
  const { t } = useTranslation();
  const navigate = useNavigate();

  const loadData = useCallback((): void => {
    setOpenLoading(true);
    ProjectService.get(
      size,
      current,
      keyword,
      recentOnly
        ? TimeFormat.dateFormat(moment().subtract(30, "days").calendar())
        : ""
    )
      .then((response) => {
        setRows(response.data.records || []);
        setTotalCount(response.data.total);
      })
      .catch((error) => { })
      .finally(() => {
        setOpenLoading(false);
      });
  }, [current, size, keyword, recentOnly]);

  useEffect(() => loadData(), [loadData]);

  function convertToGeneralCardData(data: ProjectInfo[]): GeneralCardData[] {
    return data.map(d => { return { id: d.id, title: d.name, description: d.description, publicToAll: d.publicToAll, tags: d.tags, createTime: d.createTime } });
  }

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
    ProjectService.deleteById(id)
      .then(() => {
        loadData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  function activeProjectById(id: number | string) {
    setOpenLoading(true);
    ProjectService.activeById(id)
      .then(() => {
        loadData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  function releaseProjectById(id: number | string) {
    setOpenLoading(true);
    ProjectService.releaseById(id)
      .then(() => {
        loadData();
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setOpenLoading(false);
      });
  }

  function closeProjectById(id: number | string) {
    setOpenLoading(true);
    ProjectService.closeById(id)
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
      <GeneralListPageFunctionBar
        createNewAction={() => navigate(URL.CREATE_PROJECT)}
        cardView={cardView}
        recentOnly={recentOnly}
        setSize={setSize}
        setCurrent={setCurrent}
        setCardView={setCardView}
        setRecentOnly={setRecentOnly}
        setKeyword={setKeyword}
      />
      {cardView ? (
        <GeneralCardView data={convertToGeneralCardData(rows)}
          operations={operations}
          onClick={(id: number | string) =>
            navigate(URL.PROJECT_DETAIL.replace(":id", id.toString()))} />
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
