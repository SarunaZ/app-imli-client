import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ROUTE_LOGIN_PAGE, ROUTE_ROOT } from './constants';
import Loader from 'Components/Loader';
import Layout from 'HOC/withLayout';
const Login = lazy(() => import('Views/LoginView'));
const Dashboard = lazy(() => import('Views/Dashboard'));

const App = () => (
  <Routes>
    <Route path={ROUTE_LOGIN_PAGE} element={<Login />} />
    <Route path={ROUTE_ROOT} element={<Layout><Dashboard /></Layout>} />
  </Routes>
);

export default App;
