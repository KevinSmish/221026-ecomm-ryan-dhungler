import React from "react";
import { useCart } from "context/cart";
import { getPhotoUrl } from "../../util";
import moment from "moment";

const ProductCardHorizontal = ({ card, remove = true }) => {
  // context
  const [cart, setCart] = useCart();

  const removeFromCart = (cardId) => {
    // @ts-ignore
    //const newCart = cart?.filter((c) => c._id !== cardId);
    //localStorage.setItem("cart", JSON.stringify(newCart));

    // @ts-ignore
    //setCart((oldCart) => oldCart?.filter((c) => c._id !== cardId));

    const newCart = [...cart];
    // @ts-ignore
    const index = newCart.findIndex((item) => item._id === cardId);
    newCart.splice(index, 1);
    // @ts-ignore
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={getPhotoUrl(card._id)}
            alt={card.name}
            style={{
              height: "150px",
              width: "150px",
              objectFit: "cover",
              marginLeft: "-12px",
              borderTopRightRadius: "0px",
            }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{card.name}</h5>
            <h4 className="fw-bold">
              {card?.price?.toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB",
              })}
            </h4>
            <p className="card-text">
              {`${card?.description?.substring(0, 50)}..`}
            </p>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <p className="card-text">
            <small className="text-muted">
              Listed {moment(card.createdAt).fromNow()}
            </small>
          </p>
          {remove && (
            <p
              className="text-danger mb-2 pointer"
              onClick={() => removeFromCart(card._id)}
            >
              Remove
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardHorizontal;
