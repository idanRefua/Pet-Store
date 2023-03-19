import "./navbar.css";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import homeLogo from "../imgs/favicon.jpg";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";

function NavBar() {
  const [countCart, setCountCart] = useState(0);
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const admin = useSelector((state) => state.auth.userInfo.admin);
  const logOut = () => {
    dispatch(authActions.logout());
    dispatch(authActions.updateUserInfo({}));
    localStorage.clear();
    history.push("/login");
  };

  useEffect(() => {
    axios
      .get("/users/cart/products")
      .then((res) => {
        setCountCart(res.data.length);
      })
      .catch(() => {
        alert("There is error");
      });
  }, []);
  return (
    <div className="header-nav d-flex justify-content-center">
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/aboutus"
                >
                  About Us
                </NavLink>
              </li>
              <div className="">
                <li className="nav-item dropdown person-menu">
                  <Link
                    className="nav-link active dropdown-toggle my-profile"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    to={""}
                  >
                    Products
                  </Link>
                  <ul
                    className="dropdown-menu drop-down-links"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/products/food"
                        activeClassName="activeLink"
                      >
                        Food
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/products/equip"
                        activeClassName="activeLink"
                      >
                        Equip
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </div>

              <li className="nav-item">
                <NavLink to="/">
                  <img src={homeLogo} alt="home logo" className="home-logo " />
                </NavLink>
              </li>
              {!loggedIn && (
                <Fragment>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                </Fragment>
              )}
              {loggedIn && (
                <Fragment>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/userinfo/cart"
                    >
                      My Cart ({countCart})
                    </NavLink>
                  </li>
                  <div className="">
                    <li className="nav-item dropdown person-menu">
                      <Link
                        className="nav-link active dropdown-toggle my-profile"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        to={""}
                      >
                        User Info
                      </Link>
                      <ul
                        className="dropdown-menu drop-down-links"
                        aria-labelledby="navbarDropdown"
                      >
                        {admin && (
                          <Fragment>
                            <li>
                              <NavLink
                                className="dropdown-item"
                                to="/addproduct"
                                activeClassName="activeLink"
                              >
                                Add Product
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                className="dropdown-item"
                                to="/myproducts"
                                activeClassName="activeLink"
                              >
                                My Products
                              </NavLink>
                            </li>
                          </Fragment>
                        )}
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/login"
                            activeClassName="activeLink"
                            onClick={logOut}
                          >
                            Log-Out
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </div>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

<div className="">
  <li className="nav-item dropdown person-menu">
    <Link
      className="nav-link active dropdown-toggle my-profile"
      id="navbarDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      to={""}
    >
      Products
    </Link>
    <ul
      className="dropdown-menu drop-down-links"
      aria-labelledby="navbarDropdown"
    >
      <li>
        <NavLink
          className="dropdown-item"
          to="/products/food"
          activeClassName="activeLink"
        >
          Food
        </NavLink>
      </li>
      <li>
        <NavLink
          className="dropdown-item"
          to="/products/equip"
          activeClassName="activeLink"
        >
          Equip
        </NavLink>
      </li>
    </ul>
  </li>
</div>;
