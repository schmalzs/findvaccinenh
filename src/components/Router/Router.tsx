import { Suspense, lazy } from 'react';
import { Route, Switch } from 'wouter';

const Home = lazy(() => import('components/Home'));
const Location = lazy(() => import('components/Location'));
const NotFound = lazy(() => import('components/NotFound'));

const Router = () => (
  <Suspense fallback={null}>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/location" component={Location} />
      <Route component={NotFound} />
    </Switch>
  </Suspense>
);

export default Router;
