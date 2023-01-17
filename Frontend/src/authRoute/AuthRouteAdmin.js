import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthRoute({ component: Component, ...rest }) {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const admin = useSelector((state) => state.auth.userInfo.admin);

  return (
    <Route
      {...rest}
      render={(props) => {
        loggedIn && admin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/products",
            }}
          />
        );
      }}
    ></Route>
  );
}
