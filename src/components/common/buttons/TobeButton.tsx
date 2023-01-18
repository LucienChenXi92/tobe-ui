import { ReactNode } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface TobeButtonProps {
  label?: string | undefined;
  handleOnClick?: () => void | undefined;
  color?:
    | "info"
    | "success"
    | "error"
    | "warning"
    | "primary"
    | "secondary"
    | "inherit"
    | undefined;
  variant?: "text" | "outlined" | "contained" | undefined;
}

export function getButtonByOperationName(
  name: string,
  handleOnClick: () => void,
  key?: string | number | undefined
): ReactNode {
  switch (name) {
    case "detail":
      return <DetailButton handleOnClick={handleOnClick} key={key} />;
    case "active":
      return <ActiveButton handleOnClick={handleOnClick} key={key} />;
    case "close":
      return <CloseButton handleOnClick={handleOnClick} key={key} />;
    case "delete":
      return <DeleteButton handleOnClick={handleOnClick} key={key} />;
    case "release":
      return <ReleaseButton handleOnClick={handleOnClick} key={key} />;
  }
}

export const DetailButton = (props: TobeButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      color={props?.color || "info"}
      onClick={props?.handleOnClick}
      variant={props?.variant || "text"}
    >
      {props?.label || t("components.standard-button.detail")}
    </Button>
  );
};

export const ActiveButton = (props: TobeButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      color={props?.color || "success"}
      onClick={props?.handleOnClick}
      variant={props?.variant || "text"}
    >
      {props?.label || t("components.standard-button.active")}
    </Button>
  );
};

export const CreateButton = (props: TobeButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      size="small"
      color={props?.color || "primary"}
      onClick={props?.handleOnClick}
      variant={props?.variant || "contained"}
    >
      {props?.label || t("components.standard-button.create")}
    </Button>
  );
};

export const CloseButton = (props: TobeButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      color={props?.color || "warning"}
      onClick={props?.handleOnClick}
      variant={props?.variant || "text"}
    >
      {props?.label || t("components.standard-button.close")}
    </Button>
  );
};

export const ReleaseButton = (props: TobeButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      color={props?.color || "warning"}
      onClick={props?.handleOnClick}
      variant={props?.variant || "text"}
    >
      {props?.label || t("components.standard-button.release")}
    </Button>
  );
};

export const DeleteButton = (props: TobeButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      color={props?.color || "error"}
      onClick={props?.handleOnClick}
      variant={props?.variant || "text"}
    >
      {props?.label || t("components.standard-button.delete")}
    </Button>
  );
};
