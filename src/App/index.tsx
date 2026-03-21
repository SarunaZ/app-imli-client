import { lazy, Suspense } from "react";
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
import AuthRoute from "./AuthRoute";
import { PublicRoute } from "./PublicRoute";
import MealForm from "Views/MealView/MealForm";
import ChoreForm from "Views/ChoresView/ChoreForm";
import LoginView from "Views/LoginView";
import DashboardView from "Views/Dashboard";
import MealListView from "Views/MealView";
import ProductListView from "Views/ProductListView";
import ChoresView from "Views/ChoresView";

const App = () => (
  <Routes>
    <Route
      path={ROUTE_LOGIN_PAGE}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <PublicRoute>
            <LoginView />
          </PublicRoute>
        </Suspense>

      }
    />
    <Route
      path={ROUTE_ROOT}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <AuthRoute>
            <DashboardView />
          </AuthRoute>
        </Suspense>
      }
    />
    <Route
      path={ROUTE_MEAL_EDIT_PAGE}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <AuthRoute>
            <MealListView />
          </AuthRoute>
        </Suspense>
      }
    />
    <Route
      path={ROUTE_MEAL_CREATE_PAGE}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <AuthRoute>
            <MealForm />
          </AuthRoute>
        </Suspense>
      }
    />
    <Route
      path={ROUTE_MEAL_PAGE}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <AuthRoute>
            <MealListView />
          </AuthRoute>
        </Suspense>
      }
    />
    <Route
      path={ROUTE_PRODUCT_LIST_PAGE}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <AuthRoute>
            <ProductListView />
          </AuthRoute>
        </Suspense>
      }
    />
    <Route
      path={ROUTE_CHORE_EDIT_PAGE}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <AuthRoute>
            <ChoreForm />
          </AuthRoute>
        </Suspense>
      }
    />
    <Route
      path={ROUTE_CHORE_CREATE_PAGE}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <AuthRoute>
            <ChoreForm />
          </AuthRoute>
        </Suspense>
      }
    />
    <Route
      path={ROUTE_CHORES_PAGE}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <AuthRoute>
            <ChoresView />
          </AuthRoute>
        </Suspense>
      }
    />
  </Routes>
);

export default App;
