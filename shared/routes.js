import { Route, IndexRoute } from 'react-router';
import React from 'react';
import App from './container/App';
import NoodleContainer from './container/postContainer/noodleContainer';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={NoodleContainer} />
  </Route>
);

export default routes;
