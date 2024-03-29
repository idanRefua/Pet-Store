import "./App.css";
import NavBar from "./components/NavBar.component";
import { Switch, Route, Redirect, useHistory } from "react-router";
import { Fragment, useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
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
import EditProductPage from "./pages/EditProductPage/EditProductPage";
import EquipProductsPage from "./pages/EquipProducts/EquipProductsPage";
import FoodProductPgae from "./pages/FoodProducts/FoodProductsPage";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import CartProvider from "./context/CartContext/cartContext";
import MyFavouritesPage from "./pages/MyFavouritesPage/MyFavouritesPage";

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
      <CartProvider>
        <NavBar />
        <div className="pages">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/aboutus" component={AboutUsPage} />
            <Route path="/products/equip" component={EquipProductsPage} exact />
            <Route path="/products/food" component={FoodProductPgae} exact />
            <AuthRoute path="/addproduct" component={AddProductPage} />
            <AuthRoute path="/myproducts" component={MyProductsPage} />
            <AuthRoute
              path="/editproduct/:productid"
              component={EditProductPage}
            />
            <AuthRoute path="/myfavourites" component={MyFavouritesPage} />
            <Route path="/product/description/:prid" component={ProductPage} />
            <AuthRoute path="/userinfo/cart" component={UserCartPage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </CartProvider>
      <div className="footer-component-div">
        <FooterComponent />
      </div>
    </Fragment>
  );
}

export default App;
