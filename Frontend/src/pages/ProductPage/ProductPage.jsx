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
  const [review, setReview] = useState();
  const [product, setProduct] = useState(null);
  const [productsReviews, setProductsReviews] = useState([]);
  const [productLikes, setProductLikes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await axios.get(`/products/product/moreinfo/${id}
        `);
        const productData = await product.data;
        setProduct(productData);
        setProductsReviews(productData.reviews);
        setProductLikes(productData.likes);
      } catch (error) {
        history.push("/notfoundpage");
      }
    };
    fetchData();
  }, [id, productsReviews]);

  const handleAddReview = async () => {
    try {
      const reviewByUser = await axios.post(`/products/addreview/${id}`, {
        review,
      });
      const dataReview = await reviewByUser.data;
      console.log(dataReview);
    } catch (error) {
      alert("can't add review right not please try again later!");
    }
  };

  const hadnleReviewText = (e) => {
    setReview(e.target.value);
  };

  return (
    <div>
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
              <h3 className="product-page-title">{product.title}</h3>
              <p className="product-page-p">{product.description}</p>
              <br />
              <br />
              <br />
              <br />
              <p>
                {!productLikes.includes(userInfo._id) && (
                  <button>Add To Favourites</button>
                )}
                {productLikes.includes(userInfo._id) && (
                  <button>Remove From Favourites</button>
                )}
              </p>
            </div>
          </div>
          <div className="container reviews-table">
            {!productsReviews.some(
              (review) => review.byUser === userInfo._id
            ) && (
              <div className="review-input">
                <textarea
                  type="text"
                  value={review}
                  name=""
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
                    <tr>
                      <td>{review.userName}</td>
                      <td>{review.review}</td>
                    </tr>
                  );
                })}
                {/*  <tr>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </Fragment>
      )}
    </div>
  );
}
