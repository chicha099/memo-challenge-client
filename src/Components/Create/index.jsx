import React, { useEffect } from "react";
import Cards from "../Cards";
import "./create.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createMemo } from "../../Redux/actions";
import { isImageUrl } from "../../Helpers";

const Create = () => {
  const dispatch = useDispatch();
  const [newImage, setNewImage] = useState("");
  const [form, setForm] = useState({
    name: "",
    images: [],
  });
  const handleNameChange = (e) => {
    setForm({ ...form, name: e.target.value });
  };
  const handleImagesChange = (e) => {
    setNewImage(e.target.value);
  };
  const handleAddImage = async () => {
    let isImage = await isImageUrl(newImage);
    if (isImage) {
      setForm({ ...form, images: [...form.images, newImage] });
      setNewImage("");
    } else {
      alert("Not an image");
    }
  };
  const handleCreateMemo = () => {
    dispatch(createMemo(form));
  };
  const handleDeleteImage = (index) => {
    let newImages = form.images.filter((image, i) => i !== index);
    setForm({ ...form, images: newImages });
  };
  return (
    <div className="create">
      {form.name}
      {form.images.map((image, index) => {
        return (
          <div>
            <p>{image}</p>
            <button onClick={() => handleDeleteImage(index)}>(x)</button>
          </div>
          
        )
      })}
      <div>
        <input
          type="text"
          name="name"
          id="name_input"
          onChange={(e) => handleNameChange(e)}
        />
        <input
          type="text"
          name="images"
          id="images_input"
          value={newImage}
          onChange={(e) => handleImagesChange(e)}
        />
        <button onClick={() => handleAddImage()}>+</button>
        <button onClick={() => handleCreateMemo()} disabled={!form.name || !form.images.length}>Create memo test</button>
      </div>
    </div>
  );
};

export default Create;
