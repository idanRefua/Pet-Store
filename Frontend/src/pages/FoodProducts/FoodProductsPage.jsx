import "./food-product-page.css";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import ProductComponent from "../../components/ProductComponent/ProductComponent";
export default function FoodProductPgae() {
  const [products, setProducts] = useState([]);
  const [filterArr, setFilterArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("All");

  useEffect(() => {
    axios
      .get("/products/food")
      .then((res) => {
        setProducts(res.data);
        setFilterArr(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const searchArrayFoodProducts = products.filter((val) => {
      if (
        (e.target.value === "" && priceFilter === "All") ||
        (val.title.toLowerCase().includes(e.target.value.toLowerCase()) &&
          priceFilter === "All")
      ) {
        return val;
      } else if (
        val.title.toLowerCase().includes(e.target.value.toLowerCase()) &&
        priceFilter
      ) {
        return val.price < priceFilter;
      }
    });
    setFilterArr(searchArrayFoodProducts);
  };

  const handleChangeFilterPrice = (e) => {
    setPriceFilter(e.target.value);
    const priceArr = products.filter((product) => {
      if (e.target.value === "All" && searchTerm === "") {
        return product;
      } else if (
        e.target.value === "All" &&
        product.title.toLowerCase().includes(searchTerm)
      ) {
        return product;
      } else if (
        e.target.value === "100" &&
        product.title.toLowerCase().includes(searchTerm)
      ) {
        return product.price < "100";
      } else if (
        e.target.value === "300" &&
        product.title.toLowerCase().includes(searchTerm)
      ) {
        return product.price < "300";
      } else if (
        e.target.value === "500" &&
        product.title.toLowerCase().includes(searchTerm)
      ) {
        return product.price < "500";
      }
    });

    setFilterArr(priceArr);
  };

  const renderData = () => {
    if (filterArr) {
      return (
        <Fragment>
          {filterArr
            .slice()
            .reverse()
            .map((product) => {
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
        </Fragment>
      );
    }
  };

  return (
    <div className="container food-products-page-box">
      <div className="row">
        <input
          type="text"
          placeholder="Search Product..."
          onChange={handleSearch}
          value={searchTerm}
          className=" col-10 w-100"
        />

        <select
          onChange={handleChangeFilterPrice}
          defaultValue={"All"}
          className="form-select filter-price-box"
          id="inputGroupSelect01"
        >
          <option className="option-select" value="All">
            All
          </option>
          <option className="option-select" value="100">
            Under 100$
          </option>
          <option className="option-select" value="300">
            Under 300$
          </option>
          <option className="option-select" value="500">
            Under 500$
          </option>
        </select>
      </div>
      <div className="row food-products-list">{renderData()}</div>
    </div>
  );
}
