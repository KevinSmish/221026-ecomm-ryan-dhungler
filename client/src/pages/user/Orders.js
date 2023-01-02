import React, { useState, useEffect } from "react";
import axios from "axios";

import { useAuth } from "context/auth";
import Jumbotron from "components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";
import OrdersTable from "components/cards/OrderTable";

const Orders = () => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get("users/orders");
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    // @ts-ignore
    if (auth?.token) getOrders();
    // @ts-ignore
  }, [auth?.token]);

  return (
    <div>
      <Jumbotron
        title="User Dashboard"
        // @ts-ignore
        subTitle={`Hello ${auth?.user?.name}`}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-3 mb-2 h4 bg-light">Orders</div>

            {orders?.map((order, index) => (
              <div
                key={order._id}
                className="border shadow bg-light rounded-4 mb-5"
              >
                {/* <pre>{JSON.stringify(order, null, 2)}</pre> */}
                <OrdersTable order={order} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
