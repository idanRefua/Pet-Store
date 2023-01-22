import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const AuthRouteAdmin = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const admin = useSelector((state) => state.auth.userInfo.admin);
  const [fromPage, setFromPage] = useState(location.pathname);
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn && admin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/home",
              state: { fromPage },
            }}
          />
        )
      }
    ></Route>
  );
};

export default AuthRouteAdmin;
