import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const ProtectedRoute = ({ component: Component, authenticated, ...rest }) => {
 return <Route render={(props) => (<Component {...props} />)} {...rest} />;
};
export default ProtectedRoute;