import { AxiosPromise } from "axios";
import { server } from ".";
import { ArticleCreationDTO, ArticleUpdateDTO } from "../global/types";

const ARTICLE_URI = "v1/article-infos";

export function getArticles(size: number, current: number): AxiosPromise {
  return server.get(`/${ARTICLE_URI}?size=${size}&current=${current + 1}`);
}

export function getArticle(id: string): AxiosPromise {
  return server.get(`/${ARTICLE_URI}/${id}`);
}

export function releaseArticle(id: string | number): AxiosPromise {
  return server.put(`/${ARTICLE_URI}/${id}/release`);
}

export function deleteArticle(id: string | number): AxiosPromise {
  return server.delete(`/${ARTICLE_URI}/${id}`);
}

export function createArticle(newArticle: ArticleCreationDTO): AxiosPromise {
  return server.post(`/${ARTICLE_URI}`, newArticle);
}

export function updateArticle(updatedArticle: ArticleUpdateDTO): AxiosPromise {
  return server.put(`/${ARTICLE_URI}/${updatedArticle.id}`, updatedArticle);
}