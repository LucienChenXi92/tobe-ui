import { AxiosPromise } from "axios";
import { server, ROOT_URL } from ".";

const USER_URI = "v1/tags";

export function getTags(keyword: string): AxiosPromise {
  return server.get(`${ROOT_URL}/${USER_URI}?keyword=${keyword}`);
}

export function createTag(keyword: string): AxiosPromise {
  return server.post(
    `${ROOT_URL}/${USER_URI}`,
    {
      keyword: keyword,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
