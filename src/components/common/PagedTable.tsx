import {
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import Loading from "./Loading";
import { Column, Operation } from "../../global/types";

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

export default function PagedTable(props: PagedTableProps) {
  return (
    <Paper
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
                            (operation) =>
                              !operation?.hide?.call(null, row) && (
                                <Button
                                  key={operation.name}
                                  onClick={() => operation.onClick(row.id)}
                                  variant={operation.variant}
                                  color={operation.color}
                                >
                                  {operation.label}
                                </Button>
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
