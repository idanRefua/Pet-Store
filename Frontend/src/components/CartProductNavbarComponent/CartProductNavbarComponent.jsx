import "./cart-product-navbar-component-style.css";
import { Fragment, useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext/cartContext";
import axios from "axios";

export default function CartProductNavbarComponent(props) {
  const cartUser = useContext(CartContext);
  const id = props.id;
  const quantity = props.quantity;
  const [productData, setProductData] = useState(undefined);

  const handleDeleteFromCart = () => {
    cartUser.deleteCart(id);
  };

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

  return (
    <Fragment>
      {productData !== undefined && (
        <div>
          <h4>{productData.title}</h4>
          <p>{quantity} total</p>
          <p>${(quantity * productData.price).toFixed(2)}</p>
          <button onClick={handleDeleteFromCart}>Remove Product</button>
          <hr />
        </div>
      )}
    </Fragment>
  );
}
