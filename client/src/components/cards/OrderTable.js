import React from "react";
import moment from "moment";
import ProductCardHorizontal from './ProductCardHorizontal';

const OrderTable = ({ order, index }) => {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Status</th>
            <th scope="col">Buyer</th>
            <th scope="col">Ordered</th>
            <th scope="col">Payment</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{index + 1}</td>
            <td>{order?.status}</td>
            <td>{order?.buyer?.name}</td>
            <td>{moment(order?.createdAt).fromNow()}</td>
            <td>{order?.payment ? "Success" : "Failed"}</td>
            <td>{order?.products?.length} products</td>
          </tr>
        </tbody>
      </table>
      <div className="container">
        <div className="row m-2">
          {order?.products?.map((p, i) => (
            <ProductCardHorizontal key={i} card={p} remove={false} />
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderTable;
