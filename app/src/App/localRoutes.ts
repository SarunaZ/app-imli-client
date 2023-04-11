/**
 * File contains all the local projects routes
 * Local routes - any route that should be reached with of without authorization
 */

import { lazy, ReactNode } from 'react';
import { RouteProps } from "react-router";

interface RouteParams {
  id: string;
}

export const localRouteMap: RouteProps[] = [
  {
    id: '404 page',
    element: lazy(() => import('Views/NotFoundView')) as unknown as ReactNode
  },
];