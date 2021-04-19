import React from "react";
import { Route, Redirect } from "react-router-dom";

function Auth({ component: Component, ...rest }) {
  const user = localStorage.getItem("username");

  console.log(user);

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
}
export default Auth;
