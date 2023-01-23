import { Fragment, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function ProductPage() {
  const history = useHistory();
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await axios.get(`/products/product/moreinfo/${id}
        `);
        const productData = await product.data;
        setProduct(productData);
      } catch (error) {
        history.push("/notfoundpage");
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {product !== null && (
        <Fragment>
          <h2>Product Page !</h2>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <img src={product.image} alt="product-image" />
        </Fragment>
      )}
    </div>
  );
}
