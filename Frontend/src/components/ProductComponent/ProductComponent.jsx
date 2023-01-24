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
        src={props.image}
        className="card-img-top img-product"
        alt={props.title}
      />
      <div className="card-body">
        <h5>{props.title}</h5>
        <p className="card-text">{props.description}</p>
      </div>
    </div>
  );
}
