import { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import ProductComponent from "../../components/ProductComponent/ProductComponent";
export default function ProductsPage() {
  const history = useHistory();
  const [productsArr, setProductsArr] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await axios.get("/products/allproducts");
        const productsData = await products.data;
        setProductsArr(productsData);
      } catch (error) {
        history.push("/notfound");
      }
    };
    fetchData();
  }, []);
  return (
    <Fragment>
      <div className="container">
        <br />
        <br />
        <div className="row">
          {productsArr.map((product) => {
            return (
              <ProductComponent
                id={product._id}
                key={product._id}
                image={product.image}
                title={product.title}
                description={product.description}
              />
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}
