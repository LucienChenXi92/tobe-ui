import { URL } from "../../routes";

export const settings: Array<{ label: string; url: string }> = [
  { label: "app-header.settings.profile", url: URL.PROFILE },
  { label: "app-header.settings.my-zone", url: URL.MY_ZONE },
  { label: "app-header.settings.projects", url: URL.PROJECTS },
  { label: "app-header.settings.articles", url: URL.ARTICLES },
  { label: "app-header.settings.subjects", url: URL.SUBJECTS },
  { label: "app-header.settings.sign-out", url: URL.SIGN_OUT },
];

export const pages: Array<{ label: string; url: string }> = [
  { label: "app-header.pages.home", url: URL.HOME },
  { label: "app-header.pages.subject", url: URL.SUBJECTS_PAGE },
  { label: "app-header.pages.tool", url: URL.TOOLS_PAGE },
  { label: "app-header.pages.about", url: URL.ABOUT },
];
