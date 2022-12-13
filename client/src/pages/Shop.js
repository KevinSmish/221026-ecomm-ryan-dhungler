import { Checkbox, Radio } from "antd";
import axios from "axios";
import Jumbotron from "components/cards/Jumbotron";
import ProductCard from "components/cards/ProductCard";
import { arrayPrices } from "prices";
import React, { useEffect, useState } from "react";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [radio, setRadio] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await axios.get("/category/list");
        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await axios.get("/products");
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };

    const loadFilteredProducts = async (categories, prices) => {
      try {
        console.log(categories);
        const { data } = await axios.post("/products/filtered", {
          categories,
          prices,
        });
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };

    if (!checkedCategories.length && !radio.length) {
      loadProducts();
    } else {
      loadFilteredProducts(checkedCategories, radio);
    }
  }, [checkedCategories, radio]);

  const handleCheck = (value, id) => {
    if (value) {
      setCheckedCategories([...checkedCategories, id]);
    } else {
      setCheckedCategories((c) => c.filter((cf) => cf !== id));
    }
  };

  return (
    <>
      <Jumbotron title="Hello World" subTitle="Welcome to React E-commerce" />

      {/* <pre>{JSON.stringify({ checkedCategories, radio }, null, 4)}</pre> */}

      <div className="container-fluid">
        <div className="row p-5">
          <div className="col-md-3">
            <h2 className="text-center p-3 mt-2 mb-2 h4 bg-light">
              Filter by Category
            </h2>
            <div className="row">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <h2 className="text-center p-3 mt-2 mb-2 h4 bg-light">
              Filter by Price
            </h2>
            <div className="row">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {arrayPrices?.map((p) => (
                  <div key={p._id} style={{ marginLeft: "8px" }}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>

            <div className="p-5 pt-3">
              <button
                className="btn btn-secondary col-12"
                onClick={() => {
                  //setCheckedCategories([]);
                  //setRadio([]);
                  window.location.reload();
                }}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="col-md-9">
            <h2 className="text-center p-3 mt-2 mb-2 h4 bg-light">
              {products?.length} Products
            </h2>
            <div
              className="row"
              style={{ height: "100vh", overflow: "scroll" }}
            >
              {products?.map((p) => (
                <div className="col-md-4" key={p._id}>
                  <ProductCard card={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
