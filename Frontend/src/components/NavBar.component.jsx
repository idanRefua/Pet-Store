import "./navbar.css";
import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import homeLogo from "../imgs/favicon.jpg";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";

function NavBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);
  const logOut = () => {
    dispatch(authActions.logout());
    dispatch(authActions.updateUserInfo({}));
    localStorage.clear();
    history.push("/login");
  };
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
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/products"
                >
                  Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/">
                  <a href="">
                    <img
                      src={homeLogo}
                      alt="home logo"
                      className="home-logo "
                    />
                  </a>
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
                      to="/usercart"
                    >
                      My Cart
                    </NavLink>
                  </li>
                  <div className="">
                    <li className="nav-item dropdown person-menu">
                      <a
                        className="nav-link active dropdown-toggle my-profile"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        User Info
                      </a>
                      <ul
                        className="dropdown-menu drop-down-links"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/users/myprofile"
                            activeClassName="activeLink"
                          >
                            My Profile
                          </NavLink>
                        </li>
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
