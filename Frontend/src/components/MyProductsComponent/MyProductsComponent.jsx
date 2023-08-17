import { useHistory } from "react-router-dom";
import "./my-products-component.css";
export default function MyProductsComponent(props) {
  const history = useHistory();
  const handleEdit = () => {
    props.onEdit(props.id);
  };

  const handleDelete = () => {
    props.onDelete(props.id, props.title);
  };

  const moveToProduct = () => {
    history.push(`/product/description/${props.id}`);
  };

  return (
    <tr>
      <td>
        <img
          src={props.image}
          style={{ height: "150px", width: "200px" }}
          onClick={moveToProduct}
          className="image-my-products-component"
        />
      </td>
      <td className="title-product-my-prodicts">{props.title}</td>
      <td>
        <button className="edit-product-button" onClick={handleEdit}>
          Edit Product
        </button>
        <button className="delete-product-button" onClick={handleDelete}>
          Delete Product
        </button>
      </td>
    </tr>
  );
}
