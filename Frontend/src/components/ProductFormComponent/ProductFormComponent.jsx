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
      console.log(pickedFile);
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
    console.log(e.target.value);
  };
  const handlePriceInput = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
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
        history.push("/products");
      } else {
        alert(`Category must be "Food" Or "Equip"`);
      }
    } catch (error) {
      alert("We can't send the request,Please try again later");
    }
  };

  return (
    <form
      className="container"
      onSubmit={handleSubmitForm}
      encType="multipart/form-data"
    >
      <h2 className="d-flex justify-content-center">Add new Product here </h2>

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
      <div className="input-group mb-3 select-input-add-product">
        <select
          value={category}
          className="form-select"
          id="inputGroupSelect01"
          onChange={handleCategoryInput}
        >
          <option defaultValue>Choose Category...</option>
          <option value="Food">Food</option>
          <option value="Equip">Equip</option>
        </select>
      </div>
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
      <IamgeUpload onInput={handleImageInput} />
      <button>Add Product</button>
    </form>
  );
}
