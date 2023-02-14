import { Fragment } from "react";
import AboutUsComponent from "../../components/AboutUsComponent/AboutUsComponent";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

export default function AboutUsPage() {
  const handleInputImage = (pickedFile, fileIsValid) => {
    console.log(pickedFile, fileIsValid);
  };

  return (
    <Fragment>
      <AboutUsComponent />
      <ImageUpload onInput={handleInputImage} />
    </Fragment>
  );
}
