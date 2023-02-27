import { useEffect, useState } from "react";
import "./equip-products-page.css";
import axios from "axios";
import ProductComponent from "../../components/ProductComponent/ProductComponent";

export default function EquipProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("/products/equip")
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
