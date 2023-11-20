import "./product-page-style.css";
import { Fragment, useCallback, useContext, useEffect } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import ReviewTableRowComponent from "../../components/ReviewTableRowComponent/ReviewTableRowComponent";
import { CartContext } from "../../context/CartContext/cartContext";
import { FaStar } from "react-icons/fa";

export default function ProductPage() {
  const history = useHistory();
  const location = useLocation();
  const { prid } = useParams();
  const myRef = useRef(null);
  const cartUser = useContext(CartContext);
  const productQty = cartUser.getProductQty(prid);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const loggedInUser = useSelector((state) => state.auth.isLoggedIn);
  const [review, setReview] = useState("");
  const [product, setProduct] = useState(null);
  const [productsReviews, setProductsReviews] = useState([]);
  const [productLikes, setProductLikes] = useState([]);
  const [likes, setLikes] = useState([]);
  const [productsCart, setProductsCart] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [rank, setRank] = useState(null);
  const [hover, setHover] = useState(null);
  const [avgRank, setAvgRank] = useState(null);

  /* const calcAvg = useCallback((array) => {
    console.log(array);
    const avg =
      array.reduce((prev, review) => prev + review.rank, 0) / array.length;
    setAvgRank(avg);
  }, []); */

  const calcAvg = (array) => {
    const avg =
      array.reduce((prev, review) => prev + review.rank, 0) / array.length;
    setAvgRank(avg);
  };

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
        calcAvg(res.data.reviews);
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
  }, [prid, likes, userInfo._id, productsCart, history]);

  const handleAddReview = () => {
    if (review === "" || rank === null) {
      return alert("Can't add empty review or empty rank");
    }
    axios
      .post(`/products/addreview/${prid}`, {
        review,
        rank,
      })
      .then((res) => {
        let newReview = {
          _id: Math.random(),
          review: review,
          rank,
          byUser: userInfo._id,
          userName: userInfo.name,
        };
        let newArray = [...productsReviews, newReview];
        calcAvg(newArray);
        setProductsReviews((prev) => prev.concat(newReview));
      })
      .catch(() => alert("can't add review right not please try again later!"));
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
      .catch(() => alert("there is problem , try again later"));
  };

  const handleRemoveFromFavourites = () => {
    axios
      .patch(`/products/removefromfavourites/${prid}`)
      .then((res) => {
        setLikes(res.data);
      })
      .catch(() => "there is problem , try again later");
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
          calcAvg(newReviewsArrFilter);
        })
        .catch(() => {
          alert("there is problem with the server , please try again later");
        });
      setReview("");
    }
  };

  const moveToReviews = () => myRef.current.scrollIntoView();

  const handleAddToCart = () => {
    if (loggedInUser) {
      cartUser.addOneProductToCart(prid);
    } else {
      history.push("/login", { prevUrl: location.pathname });
    }
  };

  const handleRemoveOneProduct = () => {
    cartUser.removeOneProductFromCart(prid);
  };

  const handleRemoveFromCart = () => {
    cartUser.deleteCart(prid);
  };

  return (
    <div className="container">
      {product !== null && (
        <Fragment>
          <div className="row main-product-page-div">
            <div className="col-sm-6">
              <img
                src={product.image}
                alt={product.title}
                className="image-box"
              />
            </div>
            <div className="col-sm-6 ">
              <h1 className="product-page-title">{product.title}</h1>
              <h5>
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;

                  return (
                    <label className="avg-star">
                      <input type="radio" name="rank" value={index + 1} />
                      <FaStar
                        size={20}
                        onClick={moveToReviews}
                        className="avg-star-reviews"
                        color={ratingValue <= avgRank ? "#ffc107" : "#e4e5e9"}
                      />
                    </label>
                  );
                })}
                ({productsReviews.length})
              </h5>
              <br />
              <p className="product-page-p">{product.description}</p>
              <br />
              <p className="price-product-p">Price : {product.price}$</p>
              <br />

              {loggedInUser && (
                <div className="add-fav-btns">
                  <p>
                    {productLikes.includes(userInfo._id) ? (
                      <button
                        className="btn-remove-from-fav"
                        onClick={handleRemoveFromFavourites}
                      >
                        Remove From Favourites
                      </button>
                    ) : (
                      <button
                        className="btn-add-to-fav"
                        onClick={handleAddToFavourites}
                      >
                        Add To Favourites
                      </button>
                    )}
                  </p>
                </div>
              )}

              {productQty > 0 ? (
                <Fragment>
                  <div className="product-btns">
                    <button
                      onClick={handleRemoveOneProduct}
                      className="btn btn-danger remove-one-btn"
                    >
                      -
                    </button>
                    <label className=" qty-label">Qty : {productQty} </label>
                    <button
                      onClick={handleAddToCart}
                      className="btn btn-info add-one-btn"
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-danger delete-from-cart-btn"
                    onClick={handleRemoveFromCart}
                  >
                    Remove From Cart
                  </button>
                </Fragment>
              ) : (
                <button onClick={handleAddToCart} className="add-to-cart-btn">
                  Add To Cart
                </button>
              )}
            </div>
          </div>
          <div className="container reviews-table">
            {loggedInUser &&
              !productsReviews.some(
                (review) => review.byUser === userInfo._id
              ) && (
                <Fragment>
                  <div className="stars-review">
                    {[...Array(5)].map((star, index) => {
                      const currentStarRank = index + 1;
                      return (
                        <label>
                          <input
                            type="radio"
                            name="rank"
                            value={currentStarRank}
                            onClick={() => setRank(currentStarRank)}
                          />
                          <FaStar
                            size={20}
                            className="star"
                            color={
                              currentStarRank <= (hover || rank)
                                ? "#ffc107"
                                : "#e4e5e9"
                            }
                            onMouseEnter={() => setHover(currentStarRank)}
                            onMouseLeave={() => setHover(null)}
                          />
                        </label>
                      );
                    })}
                  </div>
                  <br />
                  <div className="review-input">
                    <textarea
                      type="text"
                      value={review}
                      id="product-review"
                      rows={3}
                      cols={80}
                      onChange={hadnleReviewText}
                      className="d-flex justify-content-center review-text-area"
                    />
                    <br />
                    <button
                      className="d-flex justify-content-center add-review-btn"
                      onClick={handleAddReview}
                    >
                      Add Review
                    </button>
                  </div>
                </Fragment>
              )}

            <br />
            <table className="table" id="table-reviews" ref={myRef}>
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
                      rank={review.rank}
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
