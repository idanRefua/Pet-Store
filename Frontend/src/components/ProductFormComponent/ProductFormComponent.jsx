import React from "react";
import { useState } from "react";
import IamgeUpload from "../ImageUpload/ImageUpload";
import axios from "axios";

export default function ProductFormComponent() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

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
      const result = await axios.post("/products/addproduct", formData);

      const data = await result.data;
      console.log(data);
    } catch (error) {
      console.log(error, formData);
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

      <IamgeUpload onInput={handleImageInput} />

      <button>Add Product</button>
    </form>
  );
}
