import React, { useState, useEffect } from "react";
import { useAuth } from "context/auth";
import axios from "axios";
import Jumbotron from "components/cards/Jumbotron";
import AdminMenu from "components/nav/AdminMenu";
import OrderTable from "components/cards/OrderTable";

const AdminOrders = () => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get("/users/all-orders");
        setOrders(data);
      } catch (err) {
        console.log(err);
      }
    };

    // @ts-ignore
    if (auth?.token) getOrders();
    // @ts-ignore
  }, [auth?.token]);

  return (
    <>
      {/* @ts-ignore */}
      <Jumbotron title={`Hello ${auth?.user?.name}`} subTitle="Dashboard" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Orders</div>
            {orders?.map((order, index) => (
              <div
                key={order._id}
                className="border shadow bg-light rounded-4 mb-5"
              >
                <OrderTable order={order} index={index} statusEditable={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* <div>
        AdminOrders
        <pre>{JSON.stringify(orders, null, 2)}</pre>
      </div> */}
    </>
  );
};

export default AdminOrders;
