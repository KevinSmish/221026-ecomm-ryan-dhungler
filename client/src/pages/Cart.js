import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "context/auth";
import { useCart } from "context/cart";
import Jumbotron from "components/cards/Jumbotron";
import ProductCardHorizontal from "components/cards/ProductCardHorizontal";
import UserCartSidebar from "components/cards/UserCartSidebar";

const Cart = () => {
  // context
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  // hooks
  const navigate = useNavigate();

  // @ts-ignore
  const needToLogin = auth?.token ? "" : "Please login to checkout";

  return (
    <>
      <Jumbotron
        // @ts-ignore
        title={`Hello ${auth?.token && auth?.user?.name}`}
        subTitle={
          cart?.length
            ? `You have ${cart.length} items in the cart. ${needToLogin}`
            : "Your cart is empty"
        }
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
              {cart?.length ? (
                "My Cart"
              ) : (
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {cart?.length && (
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="row">
                {/* @ts-ignore */}
                {cart?.map((product, index) => (
                  <ProductCardHorizontal key={index} card={product} />
                ))}
              </div>
            </div>

            <UserCartSidebar />
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
