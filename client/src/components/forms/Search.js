import axios from "axios";
import { useSearch } from "context/search";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // @ts-ignore
      const { data } = await axios.get(`/products/search/${values?.keywords}`);
      //console.log(data);
      // @ts-ignore
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form className="d-flex" onSubmit={handleSubmit}>
      <input
        className="form-control"
        type="search"
        placeholder="Search..."
        style={{ borderRadius: "0px" }}
        // @ts-ignore
        value={values?.keyword}
        // @ts-ignore
        onChange={(e) => setValues({ ...values, keywords: e.target.value })}
      />
      <button
        type="submit"
        className="btn btn-outline-primary"
        style={{ borderRadius: "0px" }}
      >
        Search
      </button>
    </form>
  );
};

export default Search;
