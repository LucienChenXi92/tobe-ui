import { AxiosPromise } from "axios";
import { Domain } from "../../global/types";
import { server, ROOT_URL, SERVER_URI } from "../../servers";

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
    `${ROOT_URL}/${
      SERVER_URI.GET_NEWS
    }/${domain.toLowerCase()}s?size=${size}&current=${current}&tags=${tags}`,
    options
  );
}

export function getAllNews(): AxiosPromise {
  return server.get(
    `${ROOT_URL}/${SERVER_URI.GET_NEWS}?size=1000&current=1`,
    options
  );
}
