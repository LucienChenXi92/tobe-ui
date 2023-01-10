import { Domain } from "../global/types";
import { AxiosPromise } from "axios";
import { server, ROOT_URL } from ".";

const OVERVIEW_URI = "v1/overview";

export function getOverviewData(domain: Domain): AxiosPromise {
  return server.get(`${ROOT_URL}/${OVERVIEW_URI}/${domain}`);
}
