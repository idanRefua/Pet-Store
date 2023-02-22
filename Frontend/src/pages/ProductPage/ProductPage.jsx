import "./product-page-style.css";
import { Fragment, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
export default function ProductPage() {
  const history = useHistory();
  const { id } = useParams();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const loggedInUser = useSelector((state) => state.auth.isLoggedIn);
  const [review, setReview] = useState();
  const [product, setProduct] = useState(null);
  const [productsReviews, setProductsReviews] = useState([]);
  const [productLikes, setProductLikes] = useState([]);
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    axios
      .get(
        `/products/product/moreinfo/${id}
        `
      )
      .then((res) => {
        setProduct(res.data);
        setProductsReviews(res.data.reviews);
        setProductLikes(res.data.likes);
        console.log(res.data);
      })
      .catch(() => {
        history.push("/notfound");
      });
  }, [id, likes, userInfo._id]);

  const handleAddReview = () => {
    axios
      .post(`/products/addreview/${id}`, {
        review,
      })
      .then(() => {
        let newReview = {
          _id: Math.random(),
          review: review,
          byUser: userInfo._id,
          userName: userInfo.email,
        };

        setProductsReviews((prev) => prev.concat(newReview));
      })
      .catch((err) =>
        alert("can't add review right not please try again later!")
      );
  };

  const handleAddToFavourites = () => {
    axios
      .post(
        `/products/addtofavourites/${id}
      `
      )
      .then((res) => {
        setLikes(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const handleRemoveFromFavourites = () => {
    axios
      .patch(`/products/removefromfavourites/${id}`)
      .then((res) => {
        setLikes(res.data);
      })
      .catch((err) => console.log(err));
  };

  const hadnleReviewText = (e) => {
    setReview(e.target.value);
  };

  return (
    <div className="container">
      {product !== null && (
        <Fragment>
          <div className="row main-product-page-div">
            <div className="col-sm-6">
              <img
                src={"http://localhost:8181/" + product.image}
                alt={product.title}
                className="image-box"
              />
            </div>
            <div className="col-sm-6 ">
              <h3 className="product-page-title">{product.title}</h3>
              <p className="product-page-p">{product.description}</p>
              <br />
              <br />
              <br />

              {loggedInUser && (
                <p>
                  {productLikes.includes(userInfo._id) ? (
                    <button
                      className="btn-info"
                      onClick={handleRemoveFromFavourites}
                    >
                      Remove From Favourites
                    </button>
                  ) : (
                    <button
                      className="btn-success"
                      onClick={handleAddToFavourites}
                    >
                      Add To Favourites
                    </button>
                  )}
                </p>
              )}
            </div>
          </div>
          <div className="container reviews-table">
            {loggedInUser &&
              !productsReviews.some(
                (review) => review.byUser === userInfo._id
              ) && (
                <div className="review-input">
                  <textarea
                    type="text"
                    value={review}
                    id="product-review"
                    rows={3}
                    cols={120}
                    onChange={hadnleReviewText}
                  />
                  <br />
                  <button onClick={handleAddReview}>Add Review</button>
                </div>
              )}

            <br />
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
                {productsReviews.map((review) => {
                  return (
                    <tr key={review._id}>
                      <td>{review.userName}</td>
                      <td>{review.review}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Fragment>
      )}
      <br />
      <br />
    </div>
  );
}
