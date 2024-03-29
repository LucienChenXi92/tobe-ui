import { Domain } from "../global/types";
import { AxiosPromise } from "axios";
import { server } from ".";

const OVERVIEW_URI = "v1/overview";

export function getOverviewData(domain: Domain): AxiosPromise {
  return server.get(`/${OVERVIEW_URI}/${domain}`);
}
