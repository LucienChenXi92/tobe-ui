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
import Loading from "../Loading";
import { Column, Operation } from "../../../global/types";
import { ReactNode } from "react";
import { DeleteButton, DetailButton, ReleaseButton } from "../buttons/TobeButton";


interface PagedTableProps {
  openLoading?: boolean;
  columns: readonly Column[];
  rows: any[] | [];
  totalCount: number | 0;
  size: number | 10;
  current: number | 0;
  operations?: Operation[];
  handleChangeCurrent: (event: unknown, newPage: number) => void;
  handleChangeSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: any;
}

function getButtonByOperationName(
  name: string,
  handleOnClick: () => void,
  key?: string | number | undefined
): ReactNode {
  switch (name) {
    case "detail":
      return <DetailButton handleOnClick={handleOnClick} key={key} />;
    case "delete":
      return <DeleteButton handleOnClick={handleOnClick} key={key} />;
    case "release":
      return <ReleaseButton handleOnClick={handleOnClick} key={key} />;
  }
}

export default function PagedTable(props: PagedTableProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        ...{
          width: "100%",
          overflowX: "auto",
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 2, md: 3 },
        },
        ...props.sx,
      }}
    >
      <Loading open={props.openLoading} />
      <TableContainer>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              {props.columns.map((column) => (
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
            {props.rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {props.columns.map((column) => {
                    if (column.id !== "operation") {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {props.operations?.map(
                            (operation, index) =>
                              !operation?.hide?.call(null, row) &&
                              getButtonByOperationName(
                                operation.name,
                                () => operation.onClick(row.id),
                                `${operation.name}_${index}`
                              )
                          )}
                        </TableCell>
                      );
                    }
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
        count={props.totalCount}
        rowsPerPage={props.size}
        page={props.current}
        onPageChange={props.handleChangeCurrent}
        onRowsPerPageChange={props.handleChangeSize}
      />
    </Paper>
  );
}
