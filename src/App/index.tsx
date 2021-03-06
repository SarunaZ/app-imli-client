import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Loader from '../Components/Loader';
import { authRouteMap } from './authRoutes';
import AuthRoute from './AuthRoute';
import Authentication from 'Providers/Authentication';
import { PublicRoute } from './PublicRoute';
import { publicRouteMap } from './publicRoutes';
import { localRouteMap } from './localRoutes';

const App = () => (
  <HelmetProvider>
    <Helmet title="Imli Home Utility System" />
    <Router>
      <Suspense fallback={<Loader />}>
        <Authentication>
          <Switch>
            {
              authRouteMap.map(
                routeProp =>
                  <AuthRoute key={routeProp.id} {...routeProp} />
              )
            }
            {
              publicRouteMap.map(
                routeProp =>
                  <PublicRoute key={routeProp.id} {...routeProp} />
              )
            }
            {
              localRouteMap.map(
                routeProp => (
                  <Suspense
                    key={routeProp.id}
                    fallback={<Loader />}
                  >
                    <Route {...routeProp} />
                  </Suspense>
                )
              )}
          </Switch>
        </Authentication>
      </Suspense>
    </Router>
  </HelmetProvider >
);

export default App;
