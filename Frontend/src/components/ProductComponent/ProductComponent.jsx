import "./product-component-style.css";
import { useHistory } from "react-router-dom";
import { CartContext } from "../../context/CartContext/cartContext";
import { Fragment, useContext, useEffect, useState } from "react";

export default function ProductComponent(props) {
  const cartUser = useContext(CartContext);
  const productQty = cartUser.getProductQty(props.id);
  const history = useHistory();

  const handleAddToCart = () => {
    cartUser.addOneProductToCart(props.id);
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
        src={`http://localhost:8181/${props.image}`}
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
            <button onClick={handleAddToCart} className="">
              Add To Cart
            </button>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center  move-to-product-details-btn">
        <button onClick={handleMoreInfo} className="mt-2 mb-2">
          More Details
        </button>
      </div>
    </div>
  );
}
