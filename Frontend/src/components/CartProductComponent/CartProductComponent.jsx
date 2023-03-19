import "./cart-product-style.css";

export default function CartProduct(props) {
  return (
    <div className="container">
      {props.userCart.map((product) => {
        return (
          <div key={product._id} className="cart-prodict">
            <h3>{product.title}</h3>
          </div>
        );
      })}
    </div>
  );
}
