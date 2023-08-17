import "./product-component-style.css";
import { useHistory } from "react-router-dom";
import { CartContext } from "../../context/CartContext/cartContext";
import { Fragment, useContext } from "react";
import { useSelector } from "react-redux";

export default function ProductComponent(props) {
  const loggedInUser = useSelector((state) => state.auth.isLoggedIn);
  const cartUser = useContext(CartContext);
  const productQty = cartUser.getProductQty(props.id);
  const history = useHistory();

  const handleAddToCart = () => {
    if (loggedInUser) {
      cartUser.addOneProductToCart(props.id);
    } else {
      history.push("/login");
    }
  };

  const handleRemoveOneProduct = () => {
    cartUser.removeOneProductFromCart(props.id);
  };

  const handleRemoveFromCart = () => {
    cartUser.deleteCart(props.id);
  };

  const handleMoreInfo = () => {
    history.push(`/product/description/${props.id}`);
  };

  return (
    <div className="card card-box" style={{ width: "18rem" }}>
      <img
        src={`${process.env.REACT_APP_SERVER_API}/data:image/png;base64,${props.image}`}
        className="card-img-top img-product"
        alt={props.title}
      />

      <div className="card-body">
        <h3 className="card-title">{props.title}</h3>
        <p className="d-flex justify-content-center card-price">
          {props.price}$
        </p>
      </div>
      <div className="">
        {productQty > 0 ? (
          <Fragment>
            <div className="product-btns d-flex justify-content-center">
              <button
                onClick={handleRemoveOneProduct}
                className="btn btn-danger remove-one-btn"
              >
                -
              </button>
              <label className=" qty-label">Qty : {productQty} </label>
              <button
                onClick={handleAddToCart}
                className="btn btn-info add-one-btn"
              >
                +
              </button>
            </div>

            <div className="d-flex justify-content-center">
              <button
                className=" btn-danger delete-from-cart-btn"
                onClick={handleRemoveFromCart}
              >
                Remove From Cart
              </button>
            </div>
          </Fragment>
        ) : (
          <div className="d-flex justify-content-center">
            <button onClick={handleAddToCart} className="add-to-cart-btn">
              Add To Cart
            </button>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center  move-to-product-details-btn">
        <button
          onClick={handleMoreInfo}
          className="mt-2 mb-2 more-details-product-btn"
        >
          More Details
        </button>
      </div>
    </div>
  );
}
