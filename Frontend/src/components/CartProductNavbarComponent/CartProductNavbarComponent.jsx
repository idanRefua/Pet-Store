import "./cart-product-navbar-component-style.css";
import { Fragment, useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext/cartContext";
import axios from "axios";

export default function CartProductNavbarComponent(props) {
  const cartUser = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const [productData, setProductData] = useState(undefined);

  useEffect(() => {
    axios
      .get(
        `/products/product/moreinfo/${id}
        `
      )
      .then((res) => {
        setProductData(res.data);
      })
      .catch(() => alert("Not finish quest"));
  }, []);

  const handleAddToCart = () => {
    cartUser.addOneProductToCart(props.id);
  };

  const handleRemoveOneProduct = () => {
    cartUser.removeOneProductFromCart(props.id);
  };

  const handleDeleteFromCart = () => {
    cartUser.deleteCart(id);
  };

  return (
    <Fragment>
      {productData !== undefined && (
        <div>
          <h4>{productData.title}</h4>
          <img
            src={`http://localhost:8181/${productData.image}`}
            alt={productData.title}
            className="cart-product-img"
          />
          <br />
          <span className="cart-product-p-quantity">Quantity : {quantity}</span>
          <br />
          <button
            onClick={handleRemoveOneProduct}
            className="btn btn-danger remove-one-btn"
          >
            -
          </button>

          <button
            onClick={handleAddToCart}
            className="btn btn-info add-one-btn"
          >
            +
          </button>
          <p>${(quantity * productData.price).toFixed(2)}</p>

          <button className="btn btn-danger" onClick={handleDeleteFromCart}>
            Remove Product
          </button>
          <hr />
        </div>
      )}
    </Fragment>
  );
}
