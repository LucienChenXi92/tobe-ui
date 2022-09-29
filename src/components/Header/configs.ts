import { URL } from "../../routes";

export const settings: Array<{ label: string; url: string }> = [
  { label: "app-header.settings.profile", url: URL.PROFILE },
  { label: "app-header.settings.my-zone", url: URL.MY_ZONE },
  { label: "app-header.settings.sign-out", url: URL.SIGN_OUT },
];

export const pages: Array<{ label: string; url: string }> = [
  { label: "app-header.pages.news", url: URL.NEWS },
  { label: "app-header.pages.article", url: URL.ARTICLE },
  { label: "app-header.pages.about", url: URL.ABOUT },
];
