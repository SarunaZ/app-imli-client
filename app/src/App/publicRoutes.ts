/**
 * File contains all the public projects routes
 * Public routes - any route that cannot be reached with authorization
 */

import { lazy } from 'react';
import { RouteProps } from 'react-router-dom';
import {
  ROUTE_LOGIN_PAGE
} from './constants';

interface RouteParams {
  id: string;
}

// export const publicRouteMap: RouteParams[] = [
//   {
//     id: 'login',
//     exact: true,
//     path: ROUTE_LOGIN_PAGE,
//     component: lazy(() => import('Views/LoginView'))
//   },
// ];