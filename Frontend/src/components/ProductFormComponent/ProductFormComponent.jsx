import React from "react";
import "./product-form-component.css";
import { useState } from "react";
import IamgeUpload from "../ImageUpload/ImageUpload";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function ProductFormComponent() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const history = useHistory();

  const handleImageInput = (pickedFile, fileIsValid) => {
    if (fileIsValid) {
      setImage(pickedFile);
    }
  };
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

  const handleSubmitForm = async (e) => {
    let newImage;
    e.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      newImage = reader.result;
      console.log(newImage);
    };
    reader.onerror = (err) => {
      console.log("error: ", err);
    };

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);

    try {
      if (category === "Food" || category === "Equip") {
        const result = await axios.post("/products/addproduct", formData);
        const data = await result.data;
        history.push("/myproducts");
      } else {
        alert(`Category must be "Food" Or "Equip"`);
      }
    } catch (error) {
      alert("We can't send the request,Please try again later");
    }
  };

  return (
    <form
      className="container add-product-box"
      onSubmit={handleSubmitForm}
      encType="multipart/form-data"
    >
      <h1 className="animate__animated animate__flipInY animate__delay-0.7s d-flex justify-content-center add-product-title-page">
        Add New Product
      </h1>
      <div className="row">
        <div className="col-md-6">
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
        </div>
        <div className="col-md-6">
          <IamgeUpload onInput={handleImageInput} className="img-upload" />
          <button className="add-product-btn">Add Product</button>
        </div>
      </div>
    </form>
  );
}
