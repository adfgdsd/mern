import React from "react";
import MetaData from "../layout/metaData";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const histry = useNavigate();

  return (
    <>
      <MetaData title="Confirm Order" />
      <div className="confirm_oorder">
        <i class="far fa-check-circle"></i>
        <p style={{ fontSize: "2.5rem" }}>Order Placed Successfully</p>
        <button className="btn m-0" onClick={() => histry("/orders")}>
          View Order
        </button>
      </div>
    </>
  );
};

export default OrderSuccess;
