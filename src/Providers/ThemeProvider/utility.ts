import { Theme } from "./types";

export const storedTheme =
  (localStorage.getItem("theme") as Theme) || Theme.Light;
