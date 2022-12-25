import React, { useEffect } from "react";
import Cards from "../Cards";
import "./edit.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { editMemo, getMemoById } from "../../Redux/actions";
import { isImageUrl } from "../../Helpers";
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const selectedMemo = useSelector((state) => state.selectedMemo);
  const dispatch = useDispatch();
  const [newImage, setNewImage] = useState("");
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
    if (selectedMemo.images){
      setForm(selectedMemo); 
    }
  }, [selectedMemo]);
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
  const handleEditMemo = () => {
    dispatch(editMemo(form));
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
        );
      })}
      <div>
        <input
          type="text"
          name="name"
          id="name_input"
          value={form.name}
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
        <button
          onClick={() => handleEditMemo()}
          disabled={!form.name || !form.images.length}
        >
          Edit memo test
        </button>
      </div>
    </div>
  );
};

export default Edit;
