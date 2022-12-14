import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "antd";
import moment from "moment";

const ProductCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div className="card mb-3 hoverable">
      <Badge.Ribbon text={`${card?.sold} sold`} color="red">
        <Badge.Ribbon
          text={`${
            card?.quantity >= 1
              ? `${card?.quantity - card?.sold} In stock`
              : "Out of stock"
          }`}
          placement="start"
          color="green"
        >
          <img
            className="card-img-top"
            src={`${process.env.REACT_APP_BASE_URL}/products/photo/${
              card._id
            }?${new Date().getTime()}`}
            alt={card.name}
            style={{ height: "200px", objectFit: "contain" }}
          />
        </Badge.Ribbon>
      </Badge.Ribbon>

      <div className="card-body">
        <h5 className="text-center">{card?.name}</h5>
        <h4 className="fw-bold">
          {card?.price?.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
          })}
        </h4>
        <p className="card-text">{card?.description?.substring(0, 60)}</p>
      </div>

      <div className="d-flex justify-content-between">
        <p>{moment(card.createdAt).fromNow()}</p>
      </div>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary col card-button"
          style={{ borderBottomLeftRadius: "5px", borderTopLeftRadius: "5px" }}
          onClick={() => navigate(`/products/${card.slug}`)}
        >
          View Product
        </button>
        <button
          className="btn btn-outline-primary col card-button"
          style={{
            borderBottomRightRadius: "5px",
            borderTopRightRadius: "5px",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
