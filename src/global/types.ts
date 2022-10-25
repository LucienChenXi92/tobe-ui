export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "left" | "right" | "center";
  format?: (value: any) => string;
}

export interface Operation {
  name: "detail" | "delete" | "active" | "release" | "close";
  onClick: (id: number | string) => void;
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
  owner: string;
  ownerId: string;
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
  createTime: string;
  updateTime: string;
}

export interface NewsDTO {
  id: string;
  title: string;
  newsType: string;
  description: string;
  ownerName: string;
  avatarUrl: string;
  createTime: string;
  updateTime: string | null;
  publishTime: string | null;
  viewCount: number;
}

export interface UserBriefProfileDTO {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  blog: string;
  introduction: string;
}
