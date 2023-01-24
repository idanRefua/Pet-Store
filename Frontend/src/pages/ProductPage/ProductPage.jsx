import "./product-page-style.css";
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
        console.log(productData);
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
          <div className="row main-product-page-div">
            <div className="col-sm-6">
              <img
                src={product.image}
                alt={product.title}
                className="image-box"
              />
            </div>
            <div className="col-sm-6 ">
              <h3 className="product-page-title">{product.title}</h3>
              <p className="product-page-p">{product.description}</p>
            </div>
          </div>
          <div className="container reviews-table">
            <table className="table">
              <thead>
                <tr>
                  <th className="col-sm-6" scope="col">
                    User Name
                  </th>
                  <th className="col-sm-6" scope="col">
                    Review
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Fragment>
      )}
    </div>
  );
}
