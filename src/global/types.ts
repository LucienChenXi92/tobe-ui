export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  format?: (value: any) => string;
}

export interface Operation {
  name: string;
  onClick: (id: number) => void;
  label: string;
  variant?: "text" | "contained" | "outlined";
  color?: "success" | "error" | "info" | "warning" | "primary" | "secondary";
  hide?: (data: any) => boolean;
}

export interface UserData {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  phoneNum: string;
}

export interface ProjectInfo {
  id: number;
  name: string;
  description: string;
  active: string;
  owener: string;
  publicToAll: string;
  actualStartTime: string;
  targetStartTime: string;
  actualEndTime: string;
  targetEndTime: string;
}
