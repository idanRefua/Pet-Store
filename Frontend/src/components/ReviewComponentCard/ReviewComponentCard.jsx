import "./review-card.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
export default function ReviewsComponentCard() {
  const reviews = [
    {
      id: 1,
      name: "uhdawd",
      review:
        "lorem kdoiawjdilawkd ajwnhdjawhduawd kawjduiwah duawhduahwduhawdad awudahw ddawhuoqwiu8erijhdiuwhefjwsefoiwhefis",
      image:
        "https://cdn.pixabay.com/photo/2016/03/23/04/01/woman-1274056_960_720.jpg",
    },
    {
      id: 2,
      name: "uhdawd",
      review:
        "lorem kdoiawjdilawkd ajwnhdjawhduawd kawjduiwah duawhduahwduhawdad awudahw ddawhuoqwiu8erijhdiuwhefjwsefoiwhefis",
      image:
        "https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_960_720.jpg",
    },
    {
      id: 3,
      name: "uhdawd",
      review:
        "lorem kdoiawjdilawkd ajwnhdjawhduawd kawjduiwah duawhduahwduhawdad awudahw ddawhuoqwiu8erijhdiuwhefjwsefoiwhefis",
      image:
        "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_960_720.jpg",
    },
    {
      id: 4,
      name: "uhdawd",
      review:
        "lorem kdoiawjdilawkd ajwnhdjawhduawd kawjduiwah duawhduahwduhawdad awudahw ddawhuoqwiu8erijhdiuwhefjwsefoiwhefis",
      image:
        "https://cdn.pixabay.com/photo/2016/06/20/04/30/asian-man-1468032_960_720.jpg",
    },
  ];
  return (
    <div className="reviews-cards-box">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="swiper-review"
      >
        {reviews.map((review) => {
          return (
            <SwiperSlide className="review-card" key={review.id}>
              <img
                src={review.image}
                className="image-review "
                alt="review picture"
              />
              <br />
              <div className="review-body">
                <h4 className="d-flex justify-content-center review-user-name">
                  {review.name}
                </h4>
                <p className="review-p">
                  <span className="back-tik-review">"</span>
                  {review.review}
                  <span className="back-tik-review">"</span>
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
