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
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { useTranslation } from "react-i18next";
import Loading from "./Loading";
import { Column, Operation } from "../global/types";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    height: 60,
    fontWeight: 600,
    paddingLeft: 16,
    paddingRight: 16,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 16,
    paddingRight: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface PagedTableProps {
  openLoading: boolean;
  columns: readonly Column[];
  rows: any[] | [];
  totalCount: number | 0;
  size: number | 10;
  current: number | 0;
  operations?: Operation[];
  handleChangeCurrent: (event: unknown, newPage: number) => void;
  handleChangeSize: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PagedTable(props: PagedTableProps) {
  const { t } = useTranslation();
  return (
    <Paper
      sx={{
        width: "100%",
        overflowX: "auto",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loading open={props.openLoading} />
      <TableContainer sx={{ height: 520 }}>
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow>
              {props.columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => {
              return (
                <StyledTableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                >
                  {props.columns.map((column) => {
                    if (column.id !== "operation") {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "boolean"
                            ? column.format(value)
                            : value}
                        </StyledTableCell>
                      );
                    } else {
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {props.operations?.map((operation) => (
                            <Button
                              key={operation.name}
                              onClick={() => operation.onClick(row.id)}
                              variant={operation.variant}
                              color={operation.color}
                            >
                              {operation.label}
                            </Button>
                          ))}
                        </StyledTableCell>
                      );
                    }
                  })}
                </StyledTableRow>
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
