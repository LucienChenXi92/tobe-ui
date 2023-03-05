import { getButtonByOperationName } from "./buttons/TobeButton";
import { Operation } from "../../global/types";

export default function ActionButtonBar(props: {
  operations: Operation[];
  target: { id: string | number };
}) {
  return (
    <>
      {props.operations.map(
        (operation, index) =>
          !operation?.hide?.call(null, props.target) &&
          getButtonByOperationName(
            operation.name,
            () => operation.onClick(props.target.id),
            `${operation.name}_${index}`
          )
      )}
    </>
  );
}
