import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "context/auth";
import { useCart } from "context/cart";
import PaymentForm from "components/forms/PaymentForm";

import { getLocalCurrency } from "../../util";
import { toast } from "react-hot-toast";

const UserCartSidebar = () => {
  // context
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  // state
  const [paymentToken, setPaymentToken] = useState("");
  const [buying, setBuying] = useState(false);
  // hooks
  const navigate = useNavigate();

  useEffect(() => {
    const getClientPaymentToken = async () => {
      try {
        const { data } = await axios.get("/products/token");
        setPaymentToken(data.paymentToken);
      } catch (error) {
        console.log(error);
      }
    };

    getClientPaymentToken();
    // @ts-ignore
  }, [auth?.token]);

  const cartTotal = () => {
    // @ts-ignore
    const total = cart.reduce((sum, current) => sum + current.price, 0);
    return getLocalCurrency(total);
  };

  const onPay = async (e) => {
    e.preventDefault();
    try {
      setBuying(true);
      const paymentMethod = "PayPal";
      const { data } = await axios.post("/products/payment", {
        nonce: paymentMethod,
        cart,
      });
      setBuying(false);

      if (data.ok) {
        toast.success("Payment succesful");
        localStorage.removeItem("cart");
        // @ts-ignore
        setCart([]);
        navigate("/dashboard/user/orders");
      }
    } catch (error) {
      console.log(error);
      setBuying(false);
    }
  };

  // @ts-ignore
  const userAddress = auth?.user?.address;

  return (
    <div className="col-md-3">
      <h4>Your cart summary</h4>
      Total / Address / Payments
      <hr />
      <h6>Total: {cartTotal()}</h6>
      {userAddress ? (
        <>
          <div className="mb-3">
            <hr />
            <h4>Delivery address:</h4>
            <h5>{userAddress}</h5>
          </div>
          <button
            className="btn btn-outline-warning"
            onClick={() => navigate("/dashboard/user/profile")}
          >
            Change
          </button>
        </>
      ) : (
        <div className="mb-3">
          {/* @ts-ignore */}
          {auth?.token ? (
            <button
              className="btn btn-outline-warning"
              onClick={() => navigate("/dashboard/user/profile")}
            >
              Add delivery address
            </button>
          ) : (
            <button
              className="btn btn-outline-warning mt-3"
              onClick={() => navigate("/login", { state: "/cart" })}
            >
              Login to checkout
            </button>
          )}
        </div>
      )}
      {/* @ts-ignore */}
      {auth?.token && paymentToken && cart?.length && (
        <div className="mt-3 p-3">
          <PaymentForm
            onSubmit={onPay}
            disabled={userAddress === "" || buying}
          />
        </div>
      )}
    </div>
  );
};

export default UserCartSidebar;
