import moment from "moment";
import {} from "i18next";
import "moment/locale/zh-cn.js";

function getLocale(): "en" | "zh-cn" {
  if (localStorage.getItem("i18nextLng") === "en") {
    return "en";
  } else {
    return "zh-cn";
  }
}

export function dateFormat(time: string | undefined | null) {
  return moment(time).format("YYYY-MM-DD");
}

export function timeFormat(time: string | undefined | null) {
  return moment(time).format("hh:mm a");
}

export function dateAndTimeFormat(time: string | undefined | null) {
  return moment(time).format("YYYY-MM-DD HH:mm:ss");
}

export function briefDateFormat(time: string | undefined | null) {
  return moment(time).locale(getLocale()).fromNow();
}
