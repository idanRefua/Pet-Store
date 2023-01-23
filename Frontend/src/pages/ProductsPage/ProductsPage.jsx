import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
export default function ProductsPage() {
  const history = useHistory();
  const [productsArr, setProductsArr] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await axios.get("/products/allproducts");
        const productsData = await products.data;
        setProductsArr(productsData);
        console.log(productsData);
      } catch (error) {
        history.push("/notfound");
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h2>This is Products page</h2>
      {productsArr.map((product) => {
        return (
          <div key={product._id}>
            <p>{product.description}</p>
          </div>
        );
      })}
    </div>
  );
}
