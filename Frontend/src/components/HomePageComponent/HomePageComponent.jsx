import "./home-page-component.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePageComponent() {
  const [productsArray, setProductsArray] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [filterProductsByTitle, setFilterProcuctsByTitle] = useState([]);

  /// useEffect  => bring us data of products and by search find them
  useEffect(() => {
    axios
      .get("/products/allproducts")
      .then((res) => {
        console.log(res.data);
        setProductsArray(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearchInput = (event) => {
    let inputValue = event.target.value;
    let newFilterArray = productsArray.filter((val) => {
      return val.title.toLowerCase().includes(inputValue.toLowerCase());
    });

    if (inputValue === "") {
      setFilterProcuctsByTitle([]);
      return;
    } else {
      setFilterProcuctsByTitle(newFilterArray);
    }
  };

  return (
    <div className="">
      <h2 className="d-flex justify-content-center">
        This is home page from component
      </h2>
      <br />
      <div className="input-group d-flex justify-content-center">
        <input
          type="text"
          className="form-contorl home-page-search-input"
          onChange={handleSearchInput}
        />
        {filterProductsByTitle.length !== 0 && (
          <div className="search-result">
            {filterProductsByTitle.slice(0, 5).map((product) => {
              return (
                <div key={product._id} className="product-search-box">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-search-image"
                  />
                  <span className="span-product"></span>
                  <Link
                    className="link-search-product"
                    to={`/product/description/${product._id}`}
                  >
                    {product.title}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
