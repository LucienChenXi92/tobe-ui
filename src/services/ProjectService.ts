import { AxiosPromise } from "axios";
import { server, ROOT_URL } from ".";
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

const PROJECT_URI = "v1/project-infos";
const PROGRESSES_URI = "v1/project-progresses";

export function getProjects(size: number, current: number): AxiosPromise {
  return server.get(
    `${ROOT_URL}/${PROJECT_URI}?size=${size}&current=${current + 1}`
  );
}

export function getProject(id: number | string): AxiosPromise {
  return server.get(`${ROOT_URL}/${PROJECT_URI}/${id}`);
}

export function createProject(newProject: ProjectCreationDTO): AxiosPromise {
  return server.post(`${ROOT_URL}/${PROJECT_URI}`, newProject, options);
}

export function updateProject(updatedProject: ProjectUpdateDTO) {
  return server.put(
    `${ROOT_URL}/${PROJECT_URI}/${updatedProject.id}`,
    updatedProject,
    options
  );
}

export function deleteProject(id: number | string): AxiosPromise {
  return server.delete(`${ROOT_URL}/${PROJECT_URI}/${id}`);
}

export function activeProject(id: number | string): AxiosPromise {
  return server.put(`${ROOT_URL}/${PROJECT_URI}/${id}/active`);
}

export function releaseProject(id: number | string): AxiosPromise {
  return server.put(`${ROOT_URL}/${PROJECT_URI}/${id}/release`);
}

export function closeProject(id: number | string): AxiosPromise {
  return server.put(`${ROOT_URL}/${PROJECT_URI}/${id}/close`);
}

export function createProgress(
  newProgress: ProjectProgressCreationDTO
): AxiosPromise {
  return server.post(`${ROOT_URL}/${PROGRESSES_URI}`, newProgress, options);
}

export function updateProgress(
  updatedProgress: ProjectProgressUpdateDTO
): AxiosPromise {
  return server.put(
    `${ROOT_URL}/${PROGRESSES_URI}/${updatedProgress.id}`,
    {
      id: updatedProgress.id,
      projectId: updatedProgress.projectId,
      description: updatedProgress.description,
    },
    options
  );
}
