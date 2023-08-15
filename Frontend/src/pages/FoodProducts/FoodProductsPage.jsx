import "./food-product-page.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductComponent from "../../components/ProductComponent/ProductComponent";
export default function FoodProductPgae() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products/food")
      .then((res) => {
        setProducts(res.data);
        console.log(res.data[0].image.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container food-products-page-box">
      <div className="row">
        {products.map((product) => {
          return (
            <ProductComponent
              key={product._id}
              id={product._id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          );
        })}
      </div>
    </div>
  );
}
