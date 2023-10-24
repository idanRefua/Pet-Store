import React, { useEffect } from "react";
import "./product-form-component.css";
import { useState } from "react";
import IamgeUpload from "../ImageUpload/ImageUpload";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductFormComponent() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const history = useHistory();
  const user = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (!user.admin) {
      history.push("/*");
    }
  }, []);

  const handleImageInput = (pickedFile, fileIsValid) => {
    if (fileIsValid) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(pickedFile);
      fileReader.onload = () => {
        const newImage = JSON.stringify(fileReader.result);
        setImage(fileReader.result);
      };
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

    try {
      if (category === "Food" || category === "Equip") {
        const result = await axios.post("/products/addproduct", {
          title,
          description,
          image,
          category,
          price,
        });
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
