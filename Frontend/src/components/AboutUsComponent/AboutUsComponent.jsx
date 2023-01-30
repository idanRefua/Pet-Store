import "./about-us-component.css";

export default function AboutUsComponent() {
  return (
    <div className="about-us-box">
      <h2 className="d-flex justify-content-center about-us-title">
        About Our Company
      </h2>
      <div className="row about-us-content-box">
        <div className="col-md-6 ">
          <h3 className="d-flex justify-content-center story-title">
            Our story
          </h3>
          <p className="p-story-content">
            Idan Store was created in 2005,They work years for help others to
            find the best products for dogs,food,accessories and many more.
          </p>
          <p className="p-story-content">
            We sold each year thousands of prodcuts,to all the country.
            <br />
            All the products we sell have warnlatey for 2-3 years,You can feel
            free to contact us if you have problem with any product you buy in
            our store.
          </p>
          <p className="p-story-content">
            You can buy easily in this website, You information is seure here
            and we have best protection about cards and more.
          </p>
        </div>
        <div className="col-md-6 store-map-box">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4015.415850810089!2d34.93890710047256!3d32.18943988057682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d3970f7c131f1%3A0xe198016594361051!2sYisha&#39;ayahu%2C%20Kfar%20Saba!5e0!3m2!1sen!2sil!4v1675086162358!5m2!1sen!2sil"
            width={500}
            height={400}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="our store location"
            className="store-map"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
