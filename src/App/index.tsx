import { lazy } from "react";
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

const Login = lazy(() => import("Views/LoginView"));
const Dashboard = lazy(() => import("Views/Dashboard"));
const MealList = lazy(() => import("Views/MealView"));
const ProductList = lazy(() => import("Views/ProductListView"));
const ChoresView = lazy(() => import("Views/ChoresView"));
// test
const App = () => (
  <Routes>
    <Route
      path={ROUTE_LOGIN_PAGE}
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />
    <Route
      path={ROUTE_ROOT}
      element={
        <AuthRoute>
          <Dashboard />
        </AuthRoute>
      }
    />
    <Route
      path={ROUTE_MEAL_EDIT_PAGE}
      element={
        <AuthRoute>
          <MealForm />
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
          <MealList />
        </AuthRoute>
      }
    />
    <Route
      path={ROUTE_PRODUCT_LIST_PAGE}
      element={
        <AuthRoute>
          <ProductList />
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
  </Routes>
);

export default App;
