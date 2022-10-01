import { ReactNode } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

interface StandardButtonProps {
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
  handleOnClick: () => void
): ReactNode {
  switch (name) {
    case "detail":
      return <DetailButton handleOnClick={handleOnClick} />;
    case "active":
      return <ActiveButton handleOnClick={handleOnClick} />;
    case "close":
      return <CloseButton handleOnClick={handleOnClick} />;
    case "delete":
      return <DeleteButton handleOnClick={handleOnClick} />;
    case "release":
      return <ReleaseButton handleOnClick={handleOnClick} />;
  }
}

export const DetailButton = (props: StandardButtonProps) => {
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

export const ActiveButton = (props: StandardButtonProps) => {
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

export const CreateButton = (props: StandardButtonProps) => {
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

export const CloseButton = (props: StandardButtonProps) => {
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

export const ReleaseButton = (props: StandardButtonProps) => {
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

export const DeleteButton = (props: StandardButtonProps) => {
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
