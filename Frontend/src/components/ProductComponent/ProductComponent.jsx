import "./product-component-style.css";
import { useHistory } from "react-router-dom";
export default function ProductComponent(props) {
  const history = useHistory();
  const handleMoreInfo = () => {
    history.push(`/product/description/${props.id}`);
  };

  return (
    <div onClick={handleMoreInfo} className="card" style={{ width: "18rem" }}>
      <img
        src={`http://localhost:8181/${props.image}`}
        className="card-img-top img-product"
        alt={props.title}
      />
      <div className="card-body">
        <h3>{props.title}</h3>
        <p className="card-text">{props.description}</p>
        <p className="d-flex justify-content-center">{props.price}$</p>
      </div>
    </div>
  );
}
