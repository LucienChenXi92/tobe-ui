import { AxiosPromise } from "axios";
import { Domain } from "../global/types";
import { server } from ".";

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
    `/${API_DATA_URI}/news?size=${size}&current=${current}&tags=${tags}&domain=${domain}`,
    options
  );
}

export function getSubjects(size: number, current: number): AxiosPromise {
  return server.get(
    `/${API_DATA_URI}/subjects?size=${size}&current=${current}`
  );
}

export function getSubjectById(id: string | number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/subjects/${id}`);
}

export function getArticleById(id: string | number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/articles/${id}`);
}

export function getProjectById(id: string | number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/projects/${id}`);
}

export function getVocabularyById(id: string | number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/vocabularies/${id}`);
}

export function getProgressesByProjectId(projectId: string): AxiosPromise {
  return server.get(`/${API_DATA_URI}/projects/${projectId}/progresses`);
}

export function getWordsByVocabularyId(id: string): AxiosPromise {
  return server.get(`/${API_DATA_URI}/vocabularies/${id}/words`);
}

export function getBriefProfileByUserId(userId: string | number): AxiosPromise {
  return server.get(`/${API_DATA_URI}/brief-profile/${userId}`);
}

export function getTagStatistics(domain: Domain) {
  return server.get(`/${API_DATA_URI}/tag-statistics?domain=${domain}`);
}

export function getTop5ActiveUsers() {
  return server.get(`/${API_DATA_URI}/top5-active-users`);
}
