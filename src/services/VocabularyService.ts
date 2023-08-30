import { AxiosPromise } from "axios";
import { server } from ".";
import {
  VocabularyCreationDTO,
  VocabularyUpdateDTO,
  WordCreateDTO,
} from "../global/types";

const BASE_URI = "v1/vocabularies";
const WORD_URI = "v1/words";

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

export function getWordsByVocabularyId(id: string): AxiosPromise {
  return server.get(`/${BASE_URI}/${id}/words`);
}

export function createWord(target: WordCreateDTO): AxiosPromise {
  return server.post(`/${WORD_URI}`, target);
}

export function deleteWordById(id: number): AxiosPromise {
  return server.delete(`/${WORD_URI}/${id}`);
}
