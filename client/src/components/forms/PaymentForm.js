import React, { useState } from "react";
import { getDate } from "../../util";

const PaymentForm = ({ onSubmit, disabled }) => {
  const [cardNumber, setCardNumber] = useState("1234 5678 9012");
  const [expDate, setExpDate] = useState(getDate());

  return (
    <form onSubmit={onSubmit}>
      <p>Payment</p>
      <input
        type="text"
        className="form-control p-3 m-2"
        placeholder="Write card number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <input
        type="date"
        className="form-control p-3 m-2"
        placeholder="dd-mm-yyyy"
        value={expDate}
        onChange={(e) => setExpDate(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-primary col-12 m-2 p-2"
        disabled={disabled}
      >
        {disabled ? "Processing..." : "Buy"}
      </button>
    </form>
  );
};

export default PaymentForm;
