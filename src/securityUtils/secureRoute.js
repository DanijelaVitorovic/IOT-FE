import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import ThemeWrapper from '../components/UI/ThemeWrapper';
import AuthContext from '../store/auth_context';

const SecuredRoute = ({ component: Component, ...otherProps }) => {
  const ctx = useContext(AuthContext);
  return (
    <Route
      {...otherProps}
      render={(props) => {
        if (!ctx.validToken) {
          return <Redirect to="/" />;
        }
        return (
          <ThemeWrapper>
            <Component {...props} />
          </ThemeWrapper>
        );
      }}
    />
  );
};

export default SecuredRoute;
