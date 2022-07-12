export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  format?: (value: boolean) => string;
}

export interface Operation {
  name: string;
  onClick: (id: number) => void;
  label: string;
  variant?: "text" | "contained" | "outlined";
  color?: "success" | "error" | "primary" | "secondary";
}

export interface UserData {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNum: string;
}
