import { Routes } from "./types";

export const getSanitizedPathname = 
  (pathname: string) => pathname.split('/').join('');

export const isSamePathNameInRoutes = (
  routes: Routes[],
  locationPath: string,
) =>
  routes.some(route => locationPath.includes(getSanitizedPathname(route.pathname)));