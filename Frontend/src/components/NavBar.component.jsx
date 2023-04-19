import "./navbar.css";
import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import homeLogo from "../imgs/favicon.jpg";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { CartContext } from "../context/CartContext/cartContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import CartProductNavbarComponent from "../components/CartProductNavbarComponent/CartProductNavbarComponent";
import axios from "axios";
import { getProductInfo } from "../GetData/getDataProducts";

function NavBar() {
  const cartUser = useContext(CartContext);
  const [modalCart, setModalCart] = useState(false);
  const [products, setProdutcs] = useState([]);
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
  let price;
  useEffect(() => {
    axios
      .get("/products/allproducts")
      .then((res) => {
        setProdutcs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (products.length > 0) {
    price = cartUser.getTotalCost(products, cartUser.items);
  }

  const productsCart = cartUser.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const handleShowCartUser = () => {
    setModalCart(true);
  };
  const handleCloseUserCart = () => {
    setModalCart(false);
  };

  const checkoutCart = async () => {
    try {
      const response = await axios.post("/users/checkout", {
        items: cartUser.items,
      });

      if (response.url) {
        window.location.assign(response.url);
      }
    } catch (error) {
      alert("request not work, please try again later");
    }
  };

  return (
    <div className="header-nav d-flex justify-content-center">
      <Modal show={modalCart} onHide={handleCloseUserCart}>
        <Modal.Header closeButton>
          <Modal.Title>This Is Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCart > 0 ? (
            <Fragment>
              {cartUser.items.map((curItem, index) => {
                return (
                  <CartProductNavbarComponent
                    key={index}
                    id={curItem.id}
                    quantity={curItem.quantity}
                  ></CartProductNavbarComponent>
                );
              })}
            </Fragment>
          ) : (
            <h1>There is no items in the cart</h1>
          )}
          <h2>Total : {`${price}$`}</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUserCart}>
            Close
          </Button>
          <Button onClick={checkoutCart}>Purchase the products!</Button>
        </Modal.Footer>
      </Modal>

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
                      aria-expanded="false"
                      to={"#"}
                      onClick={handleShowCartUser}
                    >
                      My Cart ({productsCart})
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
