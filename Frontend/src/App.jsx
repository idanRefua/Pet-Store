import "./App.css";
import NavBar from "./components/NavBar.component";
import { Switch, Route, Redirect, useHistory } from "react-router";
import { Fragment } from "react";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import AddProductPage from "./pages/AddProductPage/AddProductPage";
import MyProductsPage from "./pages/MyProducts/MyProductsPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import { useEffect } from "react";
import { authActions } from "./store/auth";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import UserCartPage from "./pages/UserCartPage/UserCartPage";
import AuthRoute from "./authRoute/AuthRoute";
import AuthRouteAdmin from "./authRoute/AuthRouteAdmin";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const tokenUser = localStorage.getItem("token");
    if (!tokenUser) {
      dispatch(authActions.logout());
      dispatch(authActions.updateUserInfo({}));
      return;
    }
    const decodedToken = jwt_decode(tokenUser);
    const nowDate = new Date();

    if (decodedToken.exp < nowDate.getTime() / 1000) {
      dispatch(authActions.logout());
      dispatch(authActions.updateUserInfo({}));
      localStorage.clear();
      history.push("/login");
    } else {
      dispatch(authActions.login());
      dispatch(authActions.updateUserInfo(decodedToken));
    }
  }, []);

  return (
    <Fragment>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/aboutus" component={AboutUsPage} />
        <Route path="/products" component={ProductsPage} />
        <AuthRoute path="/addproduct" component={AddProductPage} />
        <AuthRoute path="/myproducts" component={MyProductsPage} />
        <Route path="/product/description/:id" component={ProductPage} />
        <AuthRoute path="/userinfo/cart" component={UserCartPage} />
        <Route path="*" component={NotFoundPage} />
        <Route path="/notfoundpage" component={NotFoundPage} />
      </Switch>
    </Fragment>
  );
}

export default App;
