import notFoundPageImage from "../../imgs/not-found-404.jpg";
import "./not-found-page-style.css";
export default function NotFoundPage() {
  return (
    <div className="container">
      <br />
      <br />
      <div className="d-flex justify-content-center">
        <img
          className=" img-fluid not-found-image "
          src={notFoundPageImage}
          alt="not found image - 404"
        />
      </div>
      <h1 className="d-flex justify-content-center not-found-title">404</h1>
      <h1 className="d-flex justify-content-center not-found-title">
        Oops something go wrong...
      </h1>
    </div>
  );
}
