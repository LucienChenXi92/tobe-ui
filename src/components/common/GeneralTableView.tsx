import { Operation, Column } from "../../global/types";
import PagedTable from "./PagedTable";

export default function GeneralTableView(props: {
  data: any[] | [];
  totalCount: number;
  size: number;
  setSize: Function;
  current: number;
  setCurrent: Function;
  operations: Operation[];
  columns: readonly Column[];
}) {
  const handleChangeCurrent = (event: unknown, newPage: number): void => {
    props.setCurrent(newPage);
  };

  const handleChangeSize = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    props.setSize(+event.target.value);
    props.setCurrent(0);
  };
  return (
    <PagedTable
      columns={props.columns}
      rows={props.data}
      totalCount={props.totalCount}
      size={props.size}
      current={props.current}
      operations={props.operations}
      handleChangeCurrent={handleChangeCurrent}
      handleChangeSize={handleChangeSize}
    />
  );
}
