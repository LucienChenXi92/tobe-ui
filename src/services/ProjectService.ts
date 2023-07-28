import { AxiosPromise } from "axios";
import { server } from ".";
import {
  ProjectUpdateDTO,
  ProjectCreationDTO,
  ProjectProgressCreationDTO,
  ProjectProgressUpdateDTO,
} from "../global/types";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

const PROJECT_URI = "v1/projects";
const PROGRESSES_URI = "v1/project-progresses";

export function getProjects(size: number, current: number): AxiosPromise {
  return server.get(`/${PROJECT_URI}?size=${size}&current=${current + 1}`);
}

export function getProject(id: number | string): AxiosPromise {
  return server.get(`/${PROJECT_URI}/${id}`);
}

export function createProject(newProject: ProjectCreationDTO): AxiosPromise {
  return server.post(`/${PROJECT_URI}`, newProject, options);
}

export function updateProject(updatedProject: ProjectUpdateDTO) {
  return server.put(
    `/${PROJECT_URI}/${updatedProject.id}`,
    updatedProject,
    options
  );
}

export function deleteProject(id: number | string): AxiosPromise {
  return server.delete(`/${PROJECT_URI}/${id}`);
}

export function activeProject(id: number | string): AxiosPromise {
  return server.put(`/${PROJECT_URI}/${id}/active`);
}

export function releaseProject(id: number | string): AxiosPromise {
  return server.put(`/${PROJECT_URI}/${id}/release`);
}

export function closeProject(id: number | string): AxiosPromise {
  return server.put(`/${PROJECT_URI}/${id}/close`);
}

export function createProgress(
  newProgress: ProjectProgressCreationDTO
): AxiosPromise {
  return server.post(`/${PROGRESSES_URI}`, newProgress, options);
}

export function updateProgress(
  updatedProgress: ProjectProgressUpdateDTO
): AxiosPromise {
  return server.put(
    `/${PROGRESSES_URI}/${updatedProgress.id}`,
    {
      id: updatedProgress.id,
      projectId: updatedProgress.projectId,
      description: updatedProgress.description,
    },
    options
  );
}
