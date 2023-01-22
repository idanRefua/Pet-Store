import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const AuthRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [fromPage, setFromPage] = useState(location.pathname);
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { fromPage },
            }}
          />
        )
      }
    ></Route>
  );
};

export default AuthRoute;
