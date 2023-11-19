import { useSelector } from "react-redux";
import "./review-table-row-style.css";
import { FaStar } from "react-icons/fa";
export default function ReviewTableRowComponent(props) {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const handleDeleteReview = () => {
    props.onDelete(props.id);
  };

  return (
    <tr id={props.id} className="review-costumer-tr">
      <td className="username-review">{props.userName}</td>
      <td className="review-description">
        <div className="stars-review">
          {[...Array(5)].map((star, index) => {
            const ratingValue = index + 1;
            return (
              <label>
                <input type="radio" name="rank" value={index + 1} />
                <FaStar
                  size={20}
                  className="star-review"
                  color={ratingValue <= props.rank ? "#ffc107" : "#e4e5e9"}
                />
              </label>
            );
          })}
        </div>

        {props.review}
      </td>
      {props.byUser === userInfo._id && (
        <td>
          <button className="delete-review-btn" onClick={handleDeleteReview}>
            Delete
          </button>
        </td>
      )}
    </tr>
  );
}
