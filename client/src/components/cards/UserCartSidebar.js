import { useCart } from "context/cart";
import React from "react";
import { getLocalCurrency } from "../../util";

const UserCartSidebar = () => {
  // context
  const [cart, setCart] = useCart();

  const cartTotal = () => {
    // @ts-ignore
    const total = cart.reduce((sum, current) => sum + current.price, 0);
    return getLocalCurrency(total);
  };

  return <div className="col-md-3">{cartTotal()} / Address / Payments</div>;
};

export default UserCartSidebar;
