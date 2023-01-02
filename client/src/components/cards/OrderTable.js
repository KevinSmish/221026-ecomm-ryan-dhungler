import React, { useState } from "react";
import moment from "moment";
import ProductCardHorizontal from "./ProductCardHorizontal";
import { Select } from "antd";
import axios from "axios";

const OrderTable = ({ order, index, statusEditable = false }) => {
  const Statuses = [
    "Not processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];
  // state
  const [changedStatus, setChangedStatus] = useState("");
  // ant design
  const { Option } = Select;

  const handleChange = async (orderId, value) => {
    setChangedStatus(value);
    try {
      const { data } = await axios.put(`/products/order-status/${orderId}`, {
        status: value,
      });
      //getOrders();
    } catch (err) {
      console.log(err);
    }
  };

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
            <td>
              {statusEditable ? (
                <Select
                  bordered={false}
                  onChange={(value) => handleChange(order._id, value)}
                  defaultValue={order?.status}
                >
                  {Statuses.map((status, index) => (
                    <Option key={index} value={status}>
                      {status}
                    </Option>
                  ))}
                </Select>
              ) : (
                order?.status
              )}
            </td>
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
