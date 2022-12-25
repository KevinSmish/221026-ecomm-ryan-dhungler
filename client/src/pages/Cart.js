import React from "react";
import { useAuth } from "context/auth";
import { useCart } from "context/cart";
import Jumbotron from "components/cards/Jumbotron";
import UserMenu from "../components/nav/UserMenu";

const Cart = () => {
  // context
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();

  return (
    <div>
      <Jumbotron
        title="User Dashboard"
        // @ts-ignore
        subTitle={`Total ${cart?.length}`}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-3 mb-2 h4 bg-light">Cart</div>
            <p>Cart...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
