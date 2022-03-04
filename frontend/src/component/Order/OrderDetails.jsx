import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../loader/loader";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/metaData";
import { clearError, getOrderDetails } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const OrderDetails = () => {
  const Alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { error, loading, orders } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      Alert.error(error);
    }
    dispatch(getOrderDetails(id));
  }, [Alert, error, dispatch, id]);

  return (
    <>
      <MetaData title={"Order Ditels"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="orderDetilsPage">
            <div className="Order_Detils_Container">
              <p className="title title_order_detils">
                Order #{orders && orders._id}
              </p>
            </div>
            <br />
            <p className="title second_title">Shipping Info</p>
            <div className="order_detils_container">
              <div>
                <p>Name:</p>
                <span>{orders.user && orders.user.name}</span>
              </div>
              <div>
                <p>PhoneNo:</p>
                <span>
                  {orders.shippinfInfo && orders.shippinfInfo.phoneNo}
                </span>
              </div>
              <div>
                <p>Adress:</p>
                <span className="any" style={{ overflow: "auto" }}>
                  {orders.shippinfInfo &&
                    `${orders.shippinfInfo.adress},${orders.shippinfInfo.city},${orders.shippinfInfo.state},${orders.shippinfInfo.pinCode},${orders.shippinfInfo.country}`}
                </span>
              </div>
            </div>
            <p className="title second_title">Payment</p>
            <div className="orderDetilsContainerBox">
              <div>
                <p>Status:</p>
                <span
                  className={
                    orders.payMentInfo &&
                    orders.payMentInfo.status === "succeeded"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {orders.payMentInfo &&
                  orders.payMentInfo.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID"}
                </span>
              </div>
            </div>
            <p className="title second_title">Order Status</p>
            <div className="orderStatus">
              <div>
                <p>Amount:</p>
                <span>{orders.totalPrice && orders.totalPrice}</span>
              </div>
              <div>
                <p>Status:</p>
                <span
                  className={
                    orders.orderStatus && orders.orderStatus === "Delivered"
                      ? "greenColor"
                      : "redColor"
                  }
                >
                  {orders.orderStatus && orders.orderStatus}
                </span>
              </div>
            </div>
            <br />
            <div className="orderDetilsCartItems mt-4">
              <p className="title second_title mt-4">Order Items</p>
              <div className="confirm_cart_items_container">
                {orders.orderItems &&
                  orders.orderItems.map((item, i) => (
                    <div key={i}>
                      <div>
                        <img src={item.images} alt="product" />
                        <NavLink to={`/product/${item.product}`}>
                          {item.name}
                        </NavLink>
                      </div>
                      <span>
                        {item.quntaty}x{item.price}=
                        <b>TK-{item.price * item.quntaty}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderDetails;
