import { useSelector } from "react-redux";
import MyProductsComponent from "../../components/MyProductsComponent/MyProductsComponent";
import "./my-products-page.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function MyProductsPage() {
  const [productsArray, setProductsArray] = useState([]);
  const history = useHistory();
  const user = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (!user.admin) {
      history.push("/*");
    }
  }, []);

  const hadnleDeletProduct = (productId, productTitle) => {
    const userConfirm = window.confirm(
      `Are You Sure You want delete this Product  - ${productTitle}? `
    );
    if (userConfirm) {
      axios
        .delete(`/products/deleteproduct/${productId}`)
        .then(() => {
          let filterArr = productsArray.filter((product) => {
            return product._id !== productId;
          });
          setProductsArray(filterArr);
        })
        .catch(() =>
          alert("can't delete the product right now , pelase try again later")
        );
    }
  };
  const handleEdit = (productId) => {
    history.push(`/editproduct/${productId}`);
  };
  useEffect(() => {
    axios.get("/products/myproducts").then((data) => {
      setProductsArray(data.data);
    });
  }, []);

  return (
    <div>
      <h3 className="d-flex justify-content-center my-products-title animate__animated animate__backInLeft">
        Hello {user.name},This are all your products
      </h3>
      <hr className="title-hr" />
      <br />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Product Title</th>
            <th scope="col">Edit / Delete</th>
          </tr>
        </thead>
        <tbody>
          {productsArray.map((product) => {
            return (
              <MyProductsComponent
                key={product._id}
                id={product._id}
                image={product.image}
                title={product.title}
                onEdit={handleEdit}
                onDelete={hadnleDeletProduct}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
