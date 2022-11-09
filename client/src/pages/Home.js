// @ts-nocheck
import React, { useState } from "react";
import axios from "../axios";

const Home = () => {
  const [photo, setPhoto] = useState("photo-1");
  const [name, setName] = useState("Vlad");
  const [description, setDescription] = useState("desc");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = new FormData();
    productData.append("photo", photo);
    productData.append("name", name);
    productData.append("description", description);
    const { data } = await axios.post("/products", productData);
    console.log(data);
  };

  return (
    <div>
      Home
      <div className="pt-2">
        <label className="btn btn-outline-secondary col-12 mb-3">
          {photo ? photo.name : "Upload photo"}
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            hidden
          />
        </label>
      </div>
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default Home;
