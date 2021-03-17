import React from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import useGetUser from '../hooks/useGetUser';

const PrivateRoute: React.FC<RouteProps> = ({ path, component }) => {
  const { user, isLoading, error } = useGetUser();
  if ((!user && !error) || isLoading) {
    return <div>...loading</div>;
  }
  if (user) {
    return <Route path={path} component={component} />;
  }
  return <Redirect to="/" />;
};

export default PrivateRoute;
