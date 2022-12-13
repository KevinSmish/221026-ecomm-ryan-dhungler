// @ts-nocheck
import React from "react";
import { useAuth } from "context/auth";
import Jumbotron from "components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";

const Orders = () => {
  const [auth, setAuth] = useAuth();

  return (
    <div>
      <Jumbotron
        title="User Dashboard"
        subTitle={`Hello ${auth?.user?.name}`}
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-3 mb-2 h4 bg-light">Orders</div>
            <p>Orders...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
