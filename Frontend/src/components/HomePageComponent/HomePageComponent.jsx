import "./home-page-component.css";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow } from "swiper";
import ReviewsComponentCard from "../ReviewComponentCard/ReviewComponentCard";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function HomePageComponent() {
  const [productsArray, setProductsArray] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [filterProductsByTitle, setFilterProcuctsByTitle] = useState([]);

  useEffect(() => {
    axios
      .get("/products/allproducts")
      .then((res) => {
        console.log(res.data);
        setProductsArray(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearchInput = (event) => {
    let inputValue = event.target.value;
    let newFilterArray = productsArray.filter((val) => {
      return val.title.toLowerCase().includes(inputValue.toLowerCase());
    });

    if (inputValue === "") {
      setFilterProcuctsByTitle([]);
      return;
    } else {
      setFilterProcuctsByTitle(newFilterArray);
    }
  };

  return (
    <Fragment>
      <div className="home-page-main">
        <h2 className="d-flex justify-content-center">
          This is home page from component
        </h2>
        <br />
        <div className="input-group d-flex justify-content-center">
          <input
            type="text"
            className="form-contorl home-page-search-input"
            onChange={handleSearchInput}
          />
          {filterProductsByTitle.length !== 0 && (
            <div className="search-result">
              {filterProductsByTitle.slice(0, 5).map((product) => {
                return (
                  <div key={product._id} className="product-search-box">
                    <img
                      src={`http://localhost:8181/${product.image}`}
                      alt={product.title}
                      className="product-search-image"
                    />
                    <span className="span-product"></span>
                    <Link
                      className="link-search-product"
                      to={`/product/description/${product._id}`}
                    >
                      {product.title}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <br />
        <div className="products-swiper">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[EffectCoverflow, Pagination]}
            pagination={true}
            className="my-swiper"
          >
            {productsArray.map((item) => {
              return (
                <SwiperSlide className="swiper-slide" key={item._id}>
                  <img
                    src={`http://localhost:8181/${item.image}`}
                    id={item._id}
                    alt={item.title}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <br />

        <ReviewsComponentCard></ReviewsComponentCard>
      </div>
    </Fragment>
  );
}
