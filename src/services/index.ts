import server from "./server";
import * as AuthService from "./AuthService";
import * as UserService from "./UserService";
import * as ArticleService from "./ArticleService";
import * as ProjectService from "./ProjectService";
import * as PublicDataService from "./PublicDataService";
import * as OverviewService from "./OverviewService";
import * as TagService from "./TagService";

const ROOT_URL = process.env.REACT_APP_SERVER_ROOT_URL;

export {
  server,
  ROOT_URL,
  AuthService,
  UserService,
  ArticleService,
  ProjectService,
  PublicDataService,
  OverviewService,
  TagService,
};
