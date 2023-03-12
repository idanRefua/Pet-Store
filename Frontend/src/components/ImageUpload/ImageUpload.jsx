import "./image-upload.css";
import { useEffect, useRef, useState } from "react";

export default function IamgeUpload(props) {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [valid, setValid] = useState(false);
  const filePickRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickHandlerImage = (event) => {
    let pickedFile;
    let fileIsValid = valid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setValid(true);
      fileIsValid = true;
    } else {
      setValid(false);
      fileIsValid = false;
    }

    props.onInput(pickedFile, fileIsValid);
  };

  const handleImagePick = () => {
    filePickRef.current.click();
  };
  return (
    <div className="form-image-upload">
      <input
        id={props.id}
        ref={filePickRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickHandlerImage}
      />

      <div className="image-upload-btn">
        <br />
        <div className="image-preview">
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="img-upload" />
          )}
          {!previewUrl && (
            <p className="p-pick-image">You have to pick some file</p>
          )}
        </div>
        <br />

        <button
          className="pick-img-btn"
          type="button"
          onClick={handleImagePick}
        >
          Pick Image
        </button>
      </div>
      {!valid && <p className="p-not-picture">{props.errorText}</p>}
      <br />
    </div>
  );
}
