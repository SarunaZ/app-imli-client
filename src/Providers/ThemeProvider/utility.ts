import { Theme } from "./types";

export const getStoredTheme = (): Theme => {
  if (typeof window === "undefined") return Theme.Light;

  const value = window.localStorage.getItem("theme");
  return value === Theme.Dark ? Theme.Dark : Theme.Light;
};
