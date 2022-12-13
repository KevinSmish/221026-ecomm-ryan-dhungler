import React, { useState, useEffect } from "react";
import axios from "axios";

import Jumbotron from "components/cards/Jumbotron";
import ProductCard from "components/cards/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTotal = async () => {
      try {
        const { data } = await axios.get("/products/count");
        setTotal(data);
      } catch (err) {
        console.log(err);
      }
    };

    getTotal();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/products/page/${page}`);
        setProducts([...products, ...data]);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    loadProducts();
  }, [page]);

  const sorted = (sortBy) =>
    products?.sort((a, b) => (a[sortBy] < b[sortBy] ? 1 : -1));

  return (
    <div>
      <Jumbotron title="Home" subTitle="Welcome to React E-Commerce" />
      <div className="row">
        <div className="col-md-6">
          <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
            New Arrivals
          </h2>
          <div className="row">
            {products?.map((p) => (
              <div className="col-md-6" key={p._id}>
                <ProductCard card={p} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
            Best Sellers
          </h2>
          <div className="row">
            {sorted("sold")?.map((p) => (
              <div className="col-md-6" key={p._id}>
                <ProductCard card={p} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container text-center p-5">
        <h1>{total}</h1>
        {products && products.length < total && (
          <button
            className="btn btn-warning btn-lg col-md-6"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              setPage((p) => p + 1);
            }}
          >
            {loading ? "Loading" : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
