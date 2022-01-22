import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Loader from '../Components/Loader';
import { authRouteMap } from './authRoutes';
import { AuthRoute } from './AuthRoute';
import Authentication from 'Providers/Authentication';
import { PublicRoute } from './PublicRoute';
import { publicRouteMap } from './publicRoutes';
import { localRouteMap } from './localRoutes';

const App = () => (
    <HelmetProvider>
      <Helmet title="Present Connection showcase"/>
        <Router>
          <Authentication>
            <Suspense
              fallback={<Loader />}>
              <Switch>
                {authRouteMap.map(routeProp => {
                  return <AuthRoute key={routeProp.id} {...routeProp} />;
                }
                )}
                {publicRouteMap.map(routeProp => {
                  return <PublicRoute key={routeProp.id} {...routeProp} />;
                }
                )}
                {localRouteMap.map(routeProp => {
                  return <Route key={routeProp.id} {...routeProp} />;
                }
                )}
              </Switch>
            </Suspense>
          </Authentication>
        </Router>
    </HelmetProvider>
);

export default App;
