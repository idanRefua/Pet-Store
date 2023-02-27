import "./edit-product-component.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import IamgeUpload from "../ImageUpload/ImageUpload";

export default function EditProductComponent() {
  const { productid } = useParams();
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };
  const handleDescriptionInput = (e) => {
    setDescription(e.target.value);
  };
  const handleCategoryInput = (e) => {
    setCategory(e.target.value);
  };
  const handlePriceInput = (e) => {
    setPrice(e.target.value);
  };

  const handleImageInput = (e) => {
    console.log(e);
  };

  const handleSubmitForm = async () => {
    try {
      const result = await axios.patch(`/products/updateproduct/${productid}`, {
        price,
        title,
        description,
        image,
        category,
      });
      const data = await result.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios
      .get(`/products/product/moreinfo/${productid}`)
      .then((res) => {
        setProduct(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setCategory(res.data.category);
        setPrice(res.data.price);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h2 className="d-flex justify-content-center">Add new Product here </h2>
      <br />
      {product !== null && (
        <div className="edit-product-box row">
          <div className="col-sm-6">
            <label>Title</label>
            <br />
            <input
              type="text"
              placeholder="..."
              onChange={handleTitleInput}
              value={title}
            />
            <br />
            <label>Category</label>
            <br />
            <input
              type="text"
              placeholder="..."
              onChange={handleCategoryInput}
              value={category}
            />
            <br />
            <label>Description</label>
            <br />
            <input
              type="text"
              placeholder="..."
              onChange={handleDescriptionInput}
              value={description}
              name="description"
            />
            <br />
            <label>Price</label>
            <br />
            <input
              type="text"
              placeholder="..."
              onChange={handlePriceInput}
              value={price}
              name="price"
            />
            <br />
            <br />
            <img
              className="img-edit-page"
              src={`http://localhost:8181/${product.image}`}
              alt={product.title}
            />
          </div>
          <div className="col-sm-6">
            <h4>Want Change The Product Image?</h4>
            <IamgeUpload onInput={handleImageInput} />
          </div>
        </div>
      )}
      <button
        onClick={handleSubmitForm}
        className="btn-edit d-flex justify-content-center"
      >
        Add Product
      </button>
    </div>
  );
}
