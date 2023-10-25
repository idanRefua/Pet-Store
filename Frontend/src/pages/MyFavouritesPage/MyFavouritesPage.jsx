import React, { useEffect } from "react";
import "./my-favourites-page-style.css";
import axios from "axios";
const MyFavouritesPage = () => {
  useEffect(() => {
    axios
      .get("/products/myfavourites")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h1 className="d-flex justify-content-center favourites-title">
        This is Your Favourites Products
      </h1>
      MyFavouritesPage
    </div>
  );
};

export default MyFavouritesPage;
