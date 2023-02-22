import { useHistory } from "react-router-dom";
import "./my-products-component.css";
export default function MyProductsComponent(props) {
  const history = useHistory();
  const handleEdit = () => {
    props.onEdit(props.id);
  };

  const handleDelete = () => {
    props.onDelete(props.id);
  };

  const moveToProduct = () => {
    history.push(`/product/description/${props.id}`);
  };

  return (
    <tr>
      <td>
        <img
          src={`http://localhost:8181/${props.image}`}
          style={{ height: "150px", width: "200px" }}
          onClick={moveToProduct}
          className="image-my-products-component"
        />
      </td>
      <td>{props.title}</td>
      <td>
        <button onClick={handleEdit}>Edit Product</button>
        <button onClick={handleDelete}>Delete Product</button>
      </td>
    </tr>
  );
}
