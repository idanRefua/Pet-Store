import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthRoute({ component: Component, ...rest }) {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Route
      {...rest}
      render={(props) => {
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        );
      }}
    ></Route>
  );
}
