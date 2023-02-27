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
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container">
      <div className="row">
        {products.map((product) => {
          return (
            <ProductComponent
              key={product._id}
              id={product._id}
              title={product.title}
              description={product.description}
              price={product.price}
              image={product.image}
            />
          );
        })}
      </div>
    </div>
  );
}
