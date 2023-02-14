import React from "react";
import { useState } from "react";
import IamgeUpload from "../ImageUpload/ImageUpload";

export default function ProductFormComponent(props) {
  const [title, setTitle] = useState();
  const [image, setImage] = useState(undefined);
  const [description, setDescription] = useState();
  const [category, setCategory] = useState(undefined);
  const [price, setPrice] = useState();

  const handleTitleInput = (e) => {
    setTitle(e.target.value);
  };
  const handleImageInput = (pickedFile, fileIsValid) => {
    if (fileIsValid) {
      setImage(pickedFile);
    }
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
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="container" onSubmit={handleSubmitForm}>
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
      />
      <br />
      <label>Description</label>
      <br />
      <input
        type="text"
        placeholder="..."
        onChange={handlePriceInput}
        value={price}
      />

      <IamgeUpload onInput={handleImageInput} />
    </form>
  );
}
