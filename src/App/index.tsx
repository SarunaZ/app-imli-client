import { ComponentType, createElement, lazy, LazyExoticComponent, ReactNode, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import {
  ROUTE_LOGIN_PAGE,
  ROUTE_MEAL_CREATE_PAGE,
  ROUTE_MEAL_EDIT_PAGE,
  ROUTE_MEAL_PAGE,
  ROUTE_PRODUCT_LIST_PAGE,
  ROUTE_CHORES_PAGE,
  ROUTE_CHORE_CREATE_PAGE,
  ROUTE_CHORE_EDIT_PAGE,
  ROUTE_ROOT,
} from "./constants";
import PublicRoute from "./PublicRoute";
import AuthRoute from "./AuthRoute";
import Loader from "Components/Loader";

const withSuspense = <P extends object>(
  LazyView: LazyExoticComponent<ComponentType<P>>,
) => {
  return function Wrapped(props: P) {
    return (
      <Suspense fallback={<Loader />}>
        <LazyView {...props} />
      </Suspense>
    );
  };
};

const MealForm = withSuspense(lazy(() => import("Views/MealView/MealForm")));
const ChoreForm = withSuspense(lazy(() => import("Views/ChoresView/ChoreForm")));
const LoginView = withSuspense(lazy(() => import("Views/LoginView")));
const DashboardView = withSuspense(lazy(() => import("Views/Dashboard")));
const MealListView = withSuspense(lazy(() => import("Views/MealView")));
const ProductListView = withSuspense(lazy(() => import("Views/ProductListView")));
const ChoresView = withSuspense(lazy(() => import("Views/ChoresView")));
const NotFoundView = withSuspense(lazy(() => import("Views/NotFoundView")));

const App = () => (
  <Routes>
    <Route
      path={ROUTE_LOGIN_PAGE}
      element={
        <PublicRoute>
          <LoginView />
        </PublicRoute>
      }
    />
    <Route
      path={ROUTE_ROOT}
      element={
        <AuthRoute>
          <DashboardView />
        </AuthRoute>
      }
    />
    <Route
      path={ROUTE_MEAL_EDIT_PAGE}
      element={
        <AuthRoute>
          <MealListView />
        </AuthRoute>
      }
    />
    <Route
      path={ROUTE_MEAL_CREATE_PAGE}
      element={
        <AuthRoute>
          <MealForm />
        </AuthRoute>
      }
    />
    <Route
      path={ROUTE_MEAL_PAGE}
      element={
        <AuthRoute>
          <MealListView />
        </AuthRoute>
      }
    />
    <Route
      path={ROUTE_PRODUCT_LIST_PAGE}
      element={
        <AuthRoute>
          <ProductListView />
        </AuthRoute>
      }
    />
    <Route
      path={ROUTE_CHORE_EDIT_PAGE}
      element={
        <AuthRoute>
          <ChoreForm />
        </AuthRoute>
      }
    />
    <Route
      path={ROUTE_CHORE_CREATE_PAGE}
      element={
        <AuthRoute>
          <ChoreForm />
        </AuthRoute>
      }
    />
    <Route
      path={ROUTE_CHORES_PAGE}
      element={
        <AuthRoute>
          <ChoresView />
        </AuthRoute>
      }
    />
    <Route
      path="*"
      element={
        <NotFoundView />
      }
    />
  </Routes>
);

export default App;
