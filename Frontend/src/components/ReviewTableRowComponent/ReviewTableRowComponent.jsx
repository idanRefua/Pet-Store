import { useSelector } from "react-redux";
import "./review-table-row-style.css";
export default function ReviewTableRowComponent(props) {
  const userInfo = useSelector((state) => state.auth.userInfo);

  const handleDeleteReview = () => {
    props.onDelete(props.id);
  };

  return (
    <tr id={props.id}>
      <td>{props.userName}</td>
      <td className="review-description">{props.review}</td>
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
