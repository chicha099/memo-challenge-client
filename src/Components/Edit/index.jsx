import React, { useEffect } from "react";
import "./edit.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { editMemo, getMemoById } from "../../Redux/actions";
import { isImageUrl } from "../../Helpers";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Loader from "../Loader";
import Nav from "../Nav";

const Edit = () => {
  const { id } = useParams();
  const selectedMemo = useSelector((state) => state.selectedMemo);
  const history = useHistory();
  const dispatch = useDispatch();
  const [newImage, setNewImage] = useState("");
  const [error, setError] = useState({
    image: "",
  });
  const [form, setForm] = useState({
    name: "",
    images: [],
  });
  useEffect(() => {
    dispatch(getMemoById(id));
  }, []);
  const handleNameChange = (e) => {
    setForm({ ...form, name: e.target.value });
  };
  useEffect(() => {
    if (selectedMemo.images) {
      setForm(selectedMemo);
    }
  }, [selectedMemo]);
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
  const handleEditMemo = () => {
    dispatch(editMemo(form));
    history.push("/select");
  };
  const handleDeleteImage = (index) => {
    let newImages = form.images.filter((image, i) => i !== index);
    setForm({ ...form, images: newImages });
  };
  return (
    <div>
      {selectedMemo.images ? (
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

                <button
                  onClick={() => handleAddImage()}
                  disabled={!newImage}
                  className={!newImage && "disabled"}
                >
                  +
                </button>
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
              onClick={() => handleEditMemo()}
              disabled={!form.name || !form.images.length}
              className={(!form.name || !form.images.length) && "disabled"}
            >
              Accept changes
            </button>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Edit;
