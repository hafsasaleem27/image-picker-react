import React, { useRef, useState } from "react";
import { AiOutlineFileImage } from "react-icons/ai";
import "./imageUpload.css";

function ImageUpload(props) {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [pickedImage, setPickedImage] = useState("");
  const imageInput = useRef();

  const handleClick = () => {
    imageInput.current.click();
  };

  const handleChange = () => {
    const file = imageInput.current.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      setPickedImage(event.target.result);
      setFileSize((file.size / 1000000).toFixed(1) + "Mb");
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="imageUpload">
      <input
        type="file"
        name="image"
        className="imageInput"
        ref={imageInput}
        onChange={handleChange}
        accept=".jpg,.png,.jpeg"
      />
      <div
        className="imagePreview"
        style={{ borderStyle: pickedImage ? "solid" : "dashed" }}
      >
        {pickedImage ? (
          <img src={pickedImage} alt="preview" />
        ) : (
          <AiOutlineFileImage />
        )}
      </div>
      {fileName && (
        <small className="image-meta">
          {fileName} ({fileSize})
        </small>
      )}
      <button className="pickImage-btn" onClick={handleClick}>
        Choose Image
      </button>
    </div>
  );
}

export default ImageUpload;
