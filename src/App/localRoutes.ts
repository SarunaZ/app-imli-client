/**
 * File contains all the local projects routes
 * Local routes - any route that should be reached with of without authorization
 */

import { lazy } from 'react';
import { RouteProps } from "react-router";

interface RouteParams extends RouteProps {
  id: string;
}

export const localRouteMap: RouteParams[] = [
  {
    id: '404 page',
    component: lazy(() => import('Views/NotFoundView'))
  },
];