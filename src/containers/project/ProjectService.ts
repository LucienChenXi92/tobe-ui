import { AxiosPromise } from "axios";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import {
  ProjectUpdateDTO,
  ProjectCreationDTO,
  ProjectProgressCreationDTO,
  ProjectProgressUpdateDTO,
} from "../../global/types";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function getProjects(size: number, current: number): AxiosPromise {
  return server.get(
    `${ROOT_URL}/${SERVER_URI.GET_PROJECTS}?size=${size}&current=${current + 1}`
  );
}

export function getProject(id: number | string): AxiosPromise {
  return server.get(`${ROOT_URL}/${SERVER_URI.GET_PROJECTS}/${id}`);
}

export function createProject(newProject: ProjectCreationDTO): AxiosPromise {
  return server.post(
    `${ROOT_URL}/${SERVER_URI.CREATE_PROJECT}`,
    newProject,
    options
  );
}

export function updateProject(updatedProject: ProjectUpdateDTO) {
  return server.put(
    `${ROOT_URL}/${SERVER_URI.UPDATE_PROJECT}/${updatedProject.id}`,
    updatedProject,
    options
  );
}

export function deleteProject(id: number | string): AxiosPromise {
  return server.delete(`${ROOT_URL}/${SERVER_URI.DELETE_PROJECT}/${id}`);
}

export function activeProject(id: number | string): AxiosPromise {
  const uri = SERVER_URI.ACTIVE_PROJECT.replace(":projectId", id.toString());
  return server.put(`${ROOT_URL}/${uri}`);
}

export function releaseProject(id: number | string): AxiosPromise {
  const uri = SERVER_URI.RELEASE_PROJECT.replace(":projectId", id.toString());
  return server.put(`${ROOT_URL}/${uri}`);
}

export function closeProject(id: number | string): AxiosPromise {
  const uri = SERVER_URI.CLOSE_PROJECT.replace(":projectId", id.toString());
  return server.put(`${ROOT_URL}/${uri}`);
}

export function getProgresses(projectId: string): AxiosPromise {
  const uri = SERVER_URI.GET_PROJECT_PROGRESSES.replace(
    ":projectId",
    projectId
  );
  return server.get(`${ROOT_URL}/${uri}`, options);
}

export function createProgress(
  newProgress: ProjectProgressCreationDTO
): AxiosPromise {
  return server.post(
    `${ROOT_URL}/${SERVER_URI.CREATE_PROJECT_PROGRESS}`,
    newProgress,
    options
  );
}

export function updateProgress(
  updatedProgress: ProjectProgressUpdateDTO
): AxiosPromise {
  return server.put(
    `${ROOT_URL}/${SERVER_URI.UPDATE_PROJECT_PROGRESS}/${updatedProgress.id}`,
    {
      id: updatedProgress.id,
      projectId: updatedProgress.projectId,
      description: updatedProgress.description,
    },
    options
  );
}
