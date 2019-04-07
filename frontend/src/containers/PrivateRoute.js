import React from 'react';
import Cookies from 'js-cookie';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Cookies.get('token') ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
      )
    }
  />
);

export default PrivateRoute;
