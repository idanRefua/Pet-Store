import "./edit-product-component.css";
import { useParams, useHistory } from "react-router-dom";
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
  const history = useHistory();

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

  const handleImageInput = (pickedFile, fileIsValid) => {
    if (fileIsValid) {
      setImage(pickedFile);
    }
  };

  const handleSubmitForm = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    try {
      if (category === "Food" || category === "Equip") {
        const result = await axios.patch(
          `/products/updateproduct/${productid}`,
          formData
        );
        const data = await result.data;
        history.push("/myproducts");
      } else {
        alert("Please Select Category");
      }
    } catch (error) {
      alert("there is problem with the server");
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
      <h2 className="d-flex justify-content-center">Edit Product </h2>
      <br />
      {product !== null && (
        <div className="edit-product-box row">
          <div className="col-sm-6">
            <label className="label-add-product">Title</label>
            <br />
            <input
              type="text"
              onChange={handleTitleInput}
              value={title}
              className="title-input input-add-product"
            />
            <br />
            <label className="category-label label-add-product">Category</label>
            <br />
            <div className="input-group mb-3 select-input-add-product">
              <select
                value={category}
                className="form-select select-title"
                id="inputGroupSelect01"
                onChange={handleCategoryInput}
              >
                <option className="" defaultValue>
                  Choose Category...
                </option>
                <option className="" value="Food">
                  Food
                </option>
                <option className="" value="Equip">
                  Equip
                </option>
              </select>
            </div>
            <br />
            <label className="label-add-product">Description</label>
            <br />
            <textarea
              value={description}
              onChange={handleDescriptionInput}
              name=""
              id=""
              className="text-area-product-description input-add-product"
              cols={50}
              rows={5}
            ></textarea>
            <br />
            <label className="label-add-product">Price (Dollars)</label>
            <br />
            <input
              type="text"
              placeholder=""
              onChange={handlePriceInput}
              value={price}
              name="price"
              className="input-add-product"
            />
            <br />
            <br />
            <img
              className="img-edit-page"
              src={`${process.env.REACT_APP_SERVER_API}/${product.image}`}
              alt={product.title}
            />
          </div>
          <div className="col-sm-6">
            <h4>Want Change The Product Image?</h4>
            <IamgeUpload onInput={handleImageInput} />
            <button
              onClick={handleSubmitForm}
              className="add-product-btn btn-edit d-flex justify-content-center"
            >
              Edit Product
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
