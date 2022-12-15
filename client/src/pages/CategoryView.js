import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Jumbotron from "components/cards/Jumbotron";
import ProductCard from "components/cards/ProductCard";
import axios from "axios";

const CategoryView = () => {
  // state
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  // hooks
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const loadProductsByCategory = async () => {
      try {
        const { data } = await axios.get(`/category/products/${slug}`);
        setCategory(data.category);
        setProducts(data.products);
      } catch (err) {
        console.log(err);
      }
    };

    if (slug) loadProductsByCategory();
  }, [slug]);

  // @ts-ignore
  const categoryName = category?.name;

  return (
    <>
      <Jumbotron
        title={categoryName}
        subTitle={`${products?.length} products found in "${categoryName}"`}
      />
      <div className="container-fluid">
        <div className="row mt-3">
          {products?.map((p) => (
            <div key={p._id} className="col-md-4">
              <ProductCard card={p} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryView;
