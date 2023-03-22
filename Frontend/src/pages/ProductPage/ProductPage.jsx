import "./product-page-style.css";
import { Fragment, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import ReviewTableRowComponent from "../../components/ReviewTableRowComponent/ReviewTableRowComponent";

export default function ProductPage() {
  const history = useHistory();
  const { prid } = useParams();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const loggedInUser = useSelector((state) => state.auth.isLoggedIn);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const [productsReviews, setProductsReviews] = useState([]);
  const [productLikes, setProductLikes] = useState([]);
  const [likes, setLikes] = useState([]);
  const [productsCart, setProductsCart] = useState([]);
  const [userCart, setUserCart] = useState([]);
  useEffect(() => {
    axios
      .get(
        `/products/product/moreinfo/${prid}
        `
      )
      .then((res) => {
        setProduct(res.data);
        setProductsReviews(res.data.reviews);
        setProductLikes(res.data.likes);
      })
      .catch(() => {
        history.push("/notfound");
      });

    axios
      .get("/users/usercart")
      .then((res) => {
        setUserCart(res.data);
      })
      .catch((err) => console.log(err));
  }, [prid, likes, userInfo._id, productsCart]);

  const handleAddReview = () => {
    if (review === "") {
      return alert("Can't add empty review!");
    }
    axios
      .post(`/products/addreview/${prid}`, {
        review,
      })
      .then(() => {
        let newReview = {
          _id: Math.random(),
          review: review,
          byUser: userInfo._id,
          userName: userInfo.name,
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
        `/products/addtofavourites/${prid}
      `
      )
      .then((res) => {
        setLikes(res.data);
      })
      .catch((error) => console.log(error));
  };

  const handleRemoveFromFavourites = () => {
    axios
      .patch(`/products/removefromfavourites/${prid}`)
      .then((res) => {
        setLikes(res.data);
      })
      .catch((err) => console.log(err));
  };

  const hadnleReviewText = (e) => {
    setReview(e.target.value);
  };

  const handleDeleteReview = (id) => {
    const confirm = window.confirm("Do you want delete your review?");
    if (confirm) {
      axios
        .delete(`/products/removereview/${prid}`)
        .then(() => {
          let newReviewsArrFilter = productsReviews.filter((review) => {
            return review._id !== id;
          });
          setProductsReviews(newReviewsArrFilter);
        })
        .catch((err) => {
          alert("there is problem with the server , please try again later");
        });
      setReview("");
    }
  };

  const handleRemoveFromCart = () => {
    axios
      .patch(`/products/removefromcart/${prid}`)
      .then((res) => setProductsCart(res.data))
      .catch((err) => console.log(err));
  };

  const handleAddProductToUserCart = () => {
    axios
      .post(`/products/addtocart/${prid}`)
      .then((res) => setProductsCart(res.data))
      .catch((err) => console.log(err));
  };

  const findProductId = userCart.find((product) => product._id === prid);

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
                <div className="add-fav-add-cart-btns">
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
                  <p>
                    {findProductId ? (
                      <button
                        className="btn-info remove-cart-btn"
                        onClick={handleRemoveFromCart}
                      >
                        Remove From Cart
                      </button>
                    ) : (
                      <button
                        className="btn-success add-cart-btn"
                        onClick={handleAddProductToUserCart}
                      >
                        Add To Cart
                      </button>
                    )}
                  </p>
                </div>
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
                    <ReviewTableRowComponent
                      key={review._id}
                      id={review._id}
                      userName={review.userName}
                      review={review.review}
                      byUser={review.byUser}
                      onDelete={handleDeleteReview}
                    />
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
