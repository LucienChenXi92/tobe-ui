import { AxiosPromise } from "axios";
import { server } from ".";
import { VocabularyCreationDTO, VocabularyUpdateDTO } from "../global/types";

const BASE_URI = "v1/vocabularies";

export function get(
  size: number,
  current: number,
  keyword: string,
  updateFrom: string
): AxiosPromise {
  return server.get(
    `/${BASE_URI}?size=${size}&current=${
      current + 1
    }&keyword=${keyword}&updateFrom=${updateFrom}`
  );
}

export function getById(id: string): AxiosPromise {
  return server.get(`/${BASE_URI}/${id}`);
}

export function releaseById(id: string | number): AxiosPromise {
  return server.put(`/${BASE_URI}/${id}/release`);
}

export function deleteById(id: string | number): AxiosPromise {
  return server.delete(`/${BASE_URI}/${id}`);
}

export function create(target: VocabularyCreationDTO): AxiosPromise {
  return server.post(`/${BASE_URI}`, target);
}

export function update(target: VocabularyUpdateDTO): AxiosPromise {
  return server.put(`/${BASE_URI}/${target.id}`, target);
}
