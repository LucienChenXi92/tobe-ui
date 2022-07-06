import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

interface Column {
  id:
    | "id"
    | "email"
    | "username"
    | "firstName"
    | "lastName"
    | "phoneNum"
    | "status";
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "Id" },
  { id: "email", label: "Email", align: "left" },
  {
    id: "username",
    label: "Username",
    align: "left",
  },
  {
    id: "firstName",
    label: "First Name",
  },
  {
    id: "lastName",
    label: "Last Name",
  },
  {
    id: "phoneNum",
    label: "Phone Number",
  },
  {
    id: "status",
    label: "Status",
  },
];

interface Data {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNum: string;
  status: boolean;
}

function createData(
  id: number,
  email: string,
  username: string,
  firstName: string,
  lastName: string,
  phoneNum: string,
  status: boolean
): Data {
  return { id, email, username, firstName, lastName, phoneNum, status };
}

const rows = [
  createData(
    1,
    "lucien.chen@163.com",
    "lucien.chen",
    "lucien",
    "Chen",
    "13145822026",
    true
  ),
  createData(
    2,
    "fish.liu@163.com",
    "fish.liu",
    "fish",
    "Liu",
    "18682317925",
    false
  ),
  createData(
    2,
    "yongyi.chen@163.com",
    "yongyi.chen",
    "yongyi",
    "chen",
    "123",
    false
  ),
  createData(2, "likun.yan@163.com", "likun.yan", "likun", "yan", "321", false),
];

export default function UsersPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflowX: "auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TableContainer sx={{ height: 440 }}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
