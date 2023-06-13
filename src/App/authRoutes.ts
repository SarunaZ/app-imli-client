/**
 * File contains all the projects routes
 */

import { lazy } from "react";
import { RouteProps } from "react-router";
import {
  ROUTE_PRODUCT_LIST_PAGE,
  ROUTE_MEAL_PAGE,
  ROUTE_ROOT,
} from "./constants";

interface RouteParams {
  id: string;
}

// export const authRouteMap: RouteParams[] = [
//   {
//     id: 'dashboard',
//     index: true,
//     path: ROUTE_ROOT,
//     component: lazy(() => import('../Views/Dashboard'))
//   },
//   {
//     id: 'meal-page',
//     exact: true,
//     path: ROUTE_MEAL_PAGE,
//     component: lazy(() => import('../Views/MealView'))
//   },
//   {
//     id: 'product-list-page',
//     exact: true,
//     path: ROUTE_PRODUCT_LIST_PAGE,
//     component: lazy(() => import('../Views/ProductListView'))
//   },
// ];
