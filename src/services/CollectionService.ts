import { AxiosPromise } from "axios";
import { server } from ".";
import {
  TagCollectionCreationDTO,
  TagCollectionUpdateDTO,
  TagRelationshipCreateDTO,
} from "../global/types";

const COLLECTION_URI = "v1/tag-collections";
const TAG_RELATIONSHIP_URI = "v1/tag-relationship";

export function get(size: number, current: number): AxiosPromise {
  return server.get(`/${COLLECTION_URI}?size=${size}&current=${current + 1}`);
}

export function getById(id: string): AxiosPromise {
  return server.get(`/${COLLECTION_URI}/${id}`);
}

export function releaseById(id: string | number): AxiosPromise {
  return server.put(`/${COLLECTION_URI}/${id}/release`);
}

export function deleteById(id: string | number): AxiosPromise {
  return server.delete(`/${COLLECTION_URI}/${id}`);
}

export function create(target: TagCollectionCreationDTO): AxiosPromise {
  return server.post(`/${COLLECTION_URI}`, target);
}

export function update(target: TagCollectionUpdateDTO): AxiosPromise {
  return server.put(`/${COLLECTION_URI}/${target.id}`, target);
}

export function createRelationship(
  target: TagRelationshipCreateDTO
): AxiosPromise {
  return server.post(`/${TAG_RELATIONSHIP_URI}`, target);
}

export function deleteRelationship(id: string | number): AxiosPromise {
  return server.delete(`/${TAG_RELATIONSHIP_URI}/${id}`);
}
