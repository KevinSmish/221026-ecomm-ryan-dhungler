import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import moment from "moment";
import toast from "react-hot-toast";
import { Badge } from "antd";
import {
  FaDollarSign,
  FaProjectDiagram,
  FaRegClock,
  FaCheck,
  FaTimes,
  FaWarehouse,
  FaRocket,
} from "react-icons/fa";

import ProductCard from "components/cards/ProductCard";

// @ts-ignore
import { getPhotoUrl } from "util";

const ProductView = () => {
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const { slug } = useParams();

  // !Todo Remove
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadRelated = async (productId, categoryId) => {
      try {
        const { data } = await axios.get(
          `products/related/${productId}/${categoryId}`
        );
        setRelated(data);
      } catch (err) {
        console.log(err);
      }
    };

    const loadProduct = async () => {
      try {
        const { data } = await axios.get(`products/${slug}`);
        setProduct(data);
        loadRelated(data._id, data.category._id);
      } catch (error) {
        console.log(error);
      }
    };

    if (slug) loadProduct();
  }, [slug]);

  if (Object.entries(product).length === 0) return <div>Loading...</div>;
  // @ts-ignore
  const { _id, name, description, quantity, sold, price, category, createdAt } =
    product;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div className="card mb-3">
            <Badge.Ribbon text={`${sold} sold`} color="red">
              <Badge.Ribbon
                text={`${
                  quantity >= 1 ? `${quantity - sold} in stock` : "Out of stock"
                }`}
                placement="start"
                color="green"
              >
                <img
                  className="card-img-top"
                  src={getPhotoUrl(_id)}
                  alt={name}
                  style={{
                    height: "300px",
                    width: "100%",
                    objectFit: "contain",
                  }}
                />
              </Badge.Ribbon>
            </Badge.Ribbon>

            <div className="card-body">
              <h1 className="fw-bold">{name}</h1>
              <p className="card-text lead">{description}</p>
            </div>

            <div className="d-flex justify-content-between lead p-5 bg-light fw-bold">
              <div>
                <p>
                  <FaDollarSign /> Price:{" "}
                  {price?.toLocaleString("ru-RU", {
                    style: "currency",
                    currency: "RUB",
                  })}
                </p>

                <p>
                  <FaProjectDiagram /> Category: {category?.name}
                </p>

                <p>
                  <FaRegClock /> Added: {moment(createdAt).fromNow()}
                </p>

                <p>
                  {quantity > 0 ? <FaCheck /> : <FaTimes />}{" "}
                  {quantity > 0 ? "In Stock" : "Out of Stock"}
                </p>

                <p>
                  <FaWarehouse /> Available {quantity - sold}
                </p>

                <p>
                  <FaRocket /> Sold {sold}
                </p>
              </div>
            </div>

            <button
              className="btn btn-outline-primary col card-button"
              style={{
                borderBottomRightRadius: "5px",
                borderBottomLeftRadius: "5px",
              }}
              onClick={() => {
                setCart([...cart, product]);
                toast.success("Added to cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

        <div className="col-md-3">
          <h2>Related Products</h2>
          <hr />
          {related?.length < 1 && <p>Nothing found</p>}
          {related?.map((p) => (
            <ProductCard card={p} key={p._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
