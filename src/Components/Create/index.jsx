import React, { useEffect } from "react";
import Cards from "../Cards";
import "./create.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { createMemo } from "../../Redux/actions";
import { isImageUrl } from "../../Helpers";
import Nav from "../Nav";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [error, setError] = useState({
    image: "",
  });
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
      if (!form.images.includes(newImage)) {
        setForm({ ...form, images: [...form.images, newImage] });
        setNewImage("");
        setError({ ...error, image: "" });
      } else {
        setError({ ...error, image: "Image already added" });
        setNewImage("");
      }
    } else {
      setError({ ...error, image: "URL is not an image" });
    }
  };
  const handleCreateMemo = () => {
    dispatch(createMemo(form));
    history.push("/select");
  };
  const handleDeleteImage = (index) => {
    let newImages = form.images.filter((image, i) => i !== index);
    setForm({ ...form, images: newImages });
  };
  return (
    <div className="create">
             <Nav />
      <div className="inputs">
        <div>
          <p>Name:</p>
          <input
            type="text"
            name="name"
            id="name_input"
            value={form.name}
            onChange={(e) => handleNameChange(e)}
            placeholder="Add Name"
          />
        </div>
        <div>
          <p>Images:</p>
          <div className="image_input">
            <div>
              <input
                type="text"
                name="images"
                id="images_input"
                value={newImage}
                onChange={(e) => handleImagesChange(e)}
                placeholder="Add Image URL"
              />
              {error.image ? <p className="error">{error.image}</p> : ""}
            </div>
            <button onClick={() => handleAddImage()}>+</button>
          </div>
        </div>
      </div>
      <div className="form_images">
        {form.images.map((image, index) => {
          return (
            <div className="image">
              <img src={image} alt="" />
              <button onClick={() => handleDeleteImage(index)}>x</button>
            </div>
          );
        })}
      </div>
      <div className="buttons_form">
        <Link to="/select">
          <button>Cancel</button>
        </Link>
        <button
          onClick={() => handleCreateMemo()}
          disabled={!form.name || !form.images.length}
          className={(!form.name || !form.images.length) && "disabled"}
        >
          Accept changes
        </button>
      </div>
    </div>
  );
};

export default Create;
