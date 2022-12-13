import axios from "axios";
import React, { useState } from "react";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/products/search/${keyword}`);
      console.log(data);
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
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
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
