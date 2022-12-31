import { useAuth } from "context/auth";
import { useCart } from "context/cart";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getLocalCurrency } from "../../util";

const UserCartSidebar = () => {
  // context
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  // hooks
  const navigate = useNavigate();

  const cartTotal = () => {
    // @ts-ignore
    const total = cart.reduce((sum, current) => sum + current.price, 0);
    return getLocalCurrency(total);
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
            <h4>Address:</h4>
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
    </div>
  );
};

export default UserCartSidebar;
