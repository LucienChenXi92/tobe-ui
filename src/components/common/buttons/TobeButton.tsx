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
