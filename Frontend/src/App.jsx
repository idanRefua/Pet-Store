import "./App.css";
import NavBar from "./components/NavBar.component";
import { Switch, Route, Redirect } from "react-router";
import { Fragment } from "react";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";

function App() {
  return (
    <Fragment>
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/aboutus" component={AboutUsPage} />
          <Route path="/products" component={ProductsPage} />
        </Switch>
      </div>
    </Fragment>
  );
}

export default App;
