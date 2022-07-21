import React, { useState, useEffect } from "react";
import { PagedTable } from "../../components";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import { Column, UserData, Operation } from "../../global/types";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

export default function UsersPage() {
  const [current, setCurrent] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [rows, setRows] = useState<UserData[]>([]);
  const [openLoading, setOpenLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { t } = useTranslation();

  useEffect(() => loadUserData(), [current, size]);

  const columns: readonly Column[] = [
    { id: "id", label: t("user-table.label.id"), align: "center" },
    { id: "email", label: t("user-table.label.email") },
    {
      id: "username",
      label: t("user-table.label.username"),
    },
    {
      id: "firstName",
      label: t("user-table.label.first-name"),
    },
    {
      id: "lastName",
      label: t("user-table.label.last-name"),
    },
    {
      id: "phoneNum",
      label: t("user-table.label.phone-number"),
    },
    {
      id: "operation",
      label: t("user-table.label.operation"),
      align: "center",
    },
  ];

  function loadUserData() {
    setOpenLoading(true);
    server
      .get(
        `${ROOT_URL}/${SERVER_URI.GET_USERS}?size=${size}&current=${
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

  function deleteUserDate(id: number) {
    setOpenLoading(true);
    server
      .delete(`${ROOT_URL}/${SERVER_URI.DELETE_USER}/${id}`)
      .then(() => {
        setOpenLoading(true);
        loadUserData();
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

  const handleDelete = (id: number): void => {
    deleteUserDate(id);
  };

  const operations: Operation[] = [
    {
      name: "delete",
      label: t("user-table.delete-btn"),
      onClick: (id: number) => handleDelete(id),
      color: "error",
    },
  ];

  return (
    <React.Fragment>
      <Typography variant="h5" sx={{ mb: 1 }}>
        {t("user-table.title")}
      </Typography>
      <PagedTable
        openLoading={openLoading}
        columns={columns}
        rows={rows}
        totalCount={totalCount}
        size={size}
        current={current}
        operations={operations}
        handleChangeCurrent={handleChangeCurrent}
        handleChangeSize={handleChangeSize}
      />
    </React.Fragment>
  );
}
