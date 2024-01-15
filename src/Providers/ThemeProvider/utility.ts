import { getCookieData } from "Utilities/cookieParser";
import { Theme } from "./types";

export const storedTheme = getCookieData("theme") as Theme;
