import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Pages/Home';
import Sections from '../Pages/Sections';
import Categories from '../Pages/Categories';
import Entries from '../Pages/Entries';
import Charts from '../Pages/Charts';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import RegisterConfirm from '../Pages/RegisterConfirm';
import PageNotFound from '../Pages/PageNotFound';
import PrivateRoute from './PrivateRoute';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <PrivateRoute path="/sections" component={Sections} />
    <PrivateRoute path="/categories" component={Categories} />
    <PrivateRoute path="/entries" component={Entries} />
    <PrivateRoute path="/charts" component={Charts} />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/registerConfirm" component={RegisterConfirm} />
    <Route component={PageNotFound} />
  </Switch>
);

export default Routes;
