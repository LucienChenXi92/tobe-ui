import { AxiosPromise } from "axios";
import { Domain } from "../global/types";
import { server, ROOT_URL } from ".";

const API_DATA_URI = "v1/api";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function getNewsByTags(
  domain: Domain,
  size: number,
  current: number,
  tags: string[]
): AxiosPromise {
  return server.get(
    `${ROOT_URL}/${API_DATA_URI}/${domain.toLowerCase()}s?size=${size}&current=${current}&tags=${tags}`,
    options
  );
}

export function getAllNews(): AxiosPromise {
  return server.get(
    `${ROOT_URL}/${API_DATA_URI}/news?size=1000&current=1`,
    options
  );
}

export function getArticleById(id: string | number): AxiosPromise {
  return server.get(
    `${ROOT_URL}/${API_DATA_URI}/articles/${id}`
  );
}

export function getProjectById(id: string | number): AxiosPromise {
  return server.get(
    `${ROOT_URL}/${API_DATA_URI}/projects/${id}`
  );
}

export function getProgressesByProjectId(projectId: string): AxiosPromise {
  return server.get(`${ROOT_URL}/${API_DATA_URI}/projects/${projectId}/progresses`);
}

export function getBriefProfileByUserId(userId: string | number): AxiosPromise {
  return server.get(`${ROOT_URL}/${API_DATA_URI}/brief-profile/${userId}`);
}

export function getTagStatistics(domain: Domain) {
  return server.get(`${ROOT_URL}/${API_DATA_URI}/tag-statistics?domain=${domain}`);
}

export function getTop5ActiveUsers() {
  return server.get(`${ROOT_URL}/${API_DATA_URI}/top5-active-users`);
}
