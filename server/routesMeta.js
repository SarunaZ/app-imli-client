import { matchPath } from "react-router-dom";
import {
  ROUTE_ROOT,
  ROUTE_PRODUCT_LIST_PAGE,
  ROUTE_MEAL_PAGE,
  ROUTE_CHORES_PAGE,
  ROUTE_LOGIN_PAGE,
  ROUTE_MEAL_EDIT_PAGE,
  ROUTE_MEAL_CREATE_PAGE,
  ROUTE_CHORE_EDIT_PAGE,
  ROUTE_CHORE_CREATE_PAGE,
} from "../src/App/constants.ts";

export const routesMeta = [
  { path: ROUTE_LOGIN_PAGE, access: "public" },
  { path: ROUTE_ROOT, access: "protected" },
  { path: ROUTE_PRODUCT_LIST_PAGE, access: "protected" },
  { path: ROUTE_MEAL_PAGE, access: "protected" },
  { path: ROUTE_MEAL_EDIT_PAGE, access: "protected" },
  { path: ROUTE_MEAL_CREATE_PAGE, access: "protected" },
  { path: ROUTE_CHORES_PAGE, access: "protected" },
  { path: ROUTE_CHORE_EDIT_PAGE, access: "protected" },
  { path: ROUTE_CHORE_CREATE_PAGE, access: "protected" },
]

/**
 * 
 * @param {string} urlPathname 
 * @returns {string} "public" | "protected"
 */
export function getRouteAccess(urlPathname) {
  const matched = routesMeta.find((route) =>
    matchPath({ path: route.path, end: true }, urlPathname),
  );
  return matched?.access ?? "public";
}
