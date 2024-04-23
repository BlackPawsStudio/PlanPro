import { IReminder } from "./types";

export function ShowTime(unix: number) {
  return new Date(unix < 3.15e10 ? unix * 1000 : unix).toLocaleString(
    undefined,
    {
      year: "2-digit",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );
}

export function UnixToXTimeAgo(unix: number) {
  const now = new Date().getTime();
  const diff = now - unix * 1000;
  let n;
  if (diff < 60000) {
    return "just now";
  }
  if (diff < 3600000) {
    n = Math.floor(diff / 60000);
    return `${n} min${n > 1 ? "s" : ""} ago`;
  }
  if (diff < 86400000) {
    n = Math.floor(diff / 3600000);
    return `${n} hour${n > 1 ? "s" : ""} ago`;
  }
  if (diff < 604800000) {
    n = Math.floor(diff / 86400000);
    return `${n} day${n > 1 ? "s" : ""} ago`;
  }
  if (diff < 2629800000) {
    n = Math.floor(diff / 604800000);
    return `${n} week${n > 1 ? "s" : ""} ago`;
  }
  if (diff < 31557600000) {
    n = Math.floor(diff / 2629800000);
    return `${n} month${n > 1 ? "s" : ""} ago`;
  }
  n = Math.floor(diff / 31557600000);
  return `${n} year${n > 1 ? "s" : ""} ago`;
}

export function UnixToFullDate(unix: number, short?: boolean, param?: string) {
  const date = new Date(unix * 1000);
  const now = new Date().getTime();
  let locale = "en-US";
  if (typeof document !== "undefined") {
    locale = navigator.language || "en-US";
  }
  if (short && now - unix * 1000 < 86400000 && now - unix * 1000 > 86400000) {
    return date.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  }
  if (short) {
    return date.toLocaleDateString(locale, {
      year: "2-digit",
      month: "short",
      day: "numeric",
    });
  }
  if (param === "time") {
    return date.toLocaleTimeString(locale, {
      hour: "numeric",
      minute: "numeric",
    });
  }
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}

export const UnixToFullDateTimeValue = (unix: number) => {
  const date = new Date(unix < 3.15e10 ? unix * 1000 : unix)
    .toLocaleString(undefined, {
      year: "numeric",
      day: "numeric",
      month: "numeric",
    })
    .split(", ");
  return `${(date[0] || "").split("/").reverse().join("-")}`;
};

export const getDateFromTimestamp = (unix: number) => {
  return new Date(unix < 3.15e10 ? unix * 1000 : unix);
};

export function getUnixTimestamp(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

export const getTimeAhead = (expectedTime: IReminder) => {
  if (expectedTime) {
    const date = new Date();
    const expectedDate = expectedTime;

    const expectedMilliseconds =
      (expectedDate.hours * 360 + expectedDate.minutes * 6) * 10000;
    const currentMilliseconds =
      (date.getHours() * 360 + date.getMinutes() * 6) * 10000;

    return (
      expectedMilliseconds - currentMilliseconds - date.getSeconds() * 1000
    );
  }
};
