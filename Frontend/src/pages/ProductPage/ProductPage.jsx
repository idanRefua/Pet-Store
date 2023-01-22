import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
export default function ProductPage() {
  const history = useHistory();
  const [product, setProduct] = useState();
  const id = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await axios.get(`/products/moreinfo/${id}
        `);
        const productData = await product.data();
        setProduct(productData);
      } catch (error) {
        history.push("*");
      }
    };
    fetchData();
  }, []);

  return <div></div>;
}
