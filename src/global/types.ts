export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  format?: (value: any) => string;
}

export interface Operation {
  name: string;
  onClick: (id: number | string) => void;
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
  id: string;
  name: string;
  description: string;
  statusValue: number;
  owener: string;
  publicToAll: string;
  actualStartTime: string;
  targetStartTime: string;
  actualEndTime: string;
  targetEndTime: string;
}

export interface PageItem {
  label: string;
  icon: JSX.Element;
  url: string;
  requiredRoles: string[];
}

export interface ProjectCardProps {
  operations: Operation[];
  project: ProjectInfo;
}

export interface ProjectProgress {
  id: string | undefined;
  projectId: string;
  description: string;
  updaterName: string;
  updateTime: string;
}
