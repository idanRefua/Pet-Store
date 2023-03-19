import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CartProduct from "../../components/CartProductComponent/CartProductComponent";

export default function UserCartPage() {
  const user = useSelector((state) => state.auth.userInfo);
  const [userCart, setUserCart] = useState([]);

  useEffect(() => {
    axios
      .get("/users/usercart")
      .then((res) => {
        setUserCart(res.data);
      })
      .catch((er) => console.log(er));
  }, []);

  return (
    <div className="row">
      <h3 className="d-flex justify-content-center">
        hello,{user.name}, This is your cart
      </h3>
      <div className="container">
        {userCart.length >= 1 && (
          <CartProduct userCart={userCart}></CartProduct>
        )}
      </div>
    </div>
  );
}
