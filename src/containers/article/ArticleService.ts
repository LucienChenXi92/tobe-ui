import { AxiosPromise } from "axios";
import { server, ROOT_URL, SERVER_URI } from "../../servers";
import { ArticleCreationDTO, ArticleUpdateDTO } from "../../global/types";

export function getArticles(size: number, current: number): AxiosPromise {
  return server.get(
    `${ROOT_URL}/${SERVER_URI.GET_ARTICLES}?size=${size}&current=${current + 1}`
  );
}

export function getArticle(id: string): AxiosPromise {
  return server.get(`${ROOT_URL}/${SERVER_URI.GET_ARTICLES}/${id}`);
}

export function releaseArticle(id: string | number): AxiosPromise {
  return server.put(
    `${ROOT_URL}/` +
      SERVER_URI.RELEASE_ARTICLE.replace(":articleId", id.toString())
  );
}

export function deleteArticle(id: string | number): AxiosPromise {
  return server.delete(`${ROOT_URL}/${SERVER_URI.DELETE_ARTICLE}/${id}`);
}

export function createArticle(newArticle: ArticleCreationDTO): AxiosPromise {
  return server.post(`${ROOT_URL}/${SERVER_URI.CREATE_ARTICLE}`, newArticle);
}

export function updateArticle(updatedArticle: ArticleUpdateDTO): AxiosPromise {
  return server.put(
    `${ROOT_URL}/${SERVER_URI.UPDATE_ARTICLE}/${updatedArticle.id}`,
    updatedArticle
  );
}
