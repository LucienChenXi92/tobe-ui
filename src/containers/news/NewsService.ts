import { AxiosPromise } from "axios";
import { server, ROOT_URL, SERVER_URI } from "../../servers";

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

export function getNews(newsType: string): AxiosPromise {
  return server.get(
    `${ROOT_URL}/${SERVER_URI.GET_NEWS}/${newsType}?size=1000&current=1`,
    options
  );
}

export function getAllNews(): AxiosPromise {
  return server.get(
    `${ROOT_URL}/${SERVER_URI.GET_NEWS}?size=1000&current=1`,
    options
  );
}
