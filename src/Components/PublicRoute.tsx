import React, { useContext } from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { UserContext } from '../utils/userContextProvider';

const PrivateRoute: React.FC<RouteProps> = ({ path, component }) => {
  const { isLoggedIn } = useContext(UserContext);
  if (!isLoggedIn) {
    return <Route path={path} component={component} />;
  }
  return <Redirect to="/" />;
};

export default PrivateRoute;
