import React, { useEffect, useState } from "react";
import "./my-favourites-page-style.css";
import axios from "axios";
import ProductComponent from "../../components/ProductComponent/ProductComponent";
const MyFavouritesPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("/products/myfavourites")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h1 className="d-flex justify-content-center favourites-title mt-3">
        This is Your Favourites Products
      </h1>

      <div className="row mt-5">
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
};

export default MyFavouritesPage;
