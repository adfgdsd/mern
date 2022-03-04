import React, { useEffect, useState } from "react";
import MetaData from "../layout/metaData";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import SideBar from "../admin/Sidebar";
import Loader from "../loader/loader";
import { useAlert } from "react-alert";
import {
  clearError,
  getOrderDetails,
  updateOrders,
} from "../../actions/orderAction";
import { UPDATE_ORDER_RESET } from "../../constents/orderConstents";

const ProsessOrder = () => {
  const histry = useNavigate();
  const Alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { orders, loading, error } = useSelector((state) => state.orderDetails);
  const { isUpdated, error: updateError } = useSelector(
    (state) => state.orders
  );

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myFrom = new FormData();
    myFrom.set("status", status);
    dispatch(updateOrders(id,myFrom));
  };

  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch(clearError());
    }
    if (updateError) {
      Alert.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      Alert.success("update succes");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(id));
  }, [Alert, error, dispatch, id, isUpdated, updateError]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Process Order" />
          <div className="min_update_order">
            <SideBar />
            <div className="confirm_order">
              <div>
                <div className="confirm_shipping_ariam">
                  <Typography>Shipping Info</Typography>
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
                  <div className="orderDetilsContainerBox order_detils_container">
                    <Typography>
                      <b>Payment Status:</b>
                    </Typography>
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

                    <p>
                      <b>Order Status</b>
                    </p>
                    <div className="orderStatus">
                      <div>
                        <p>Status:</p>
                        <span
                          className={
                            orders.orderStatus &&
                            orders.orderStatus === "Delivered"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {orders.orderStatus && orders.orderStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="confirm_cart_items">
                    <Typography>Your Cart Items</Typography>
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
              </div>
              {/*  */}
              <div>
                <div className="order_summery ">
                  <Typography className="p">Update Order Status</Typography>
                  <div className="file_select">
                    {orders.orderStatus === "Delivered" ? (
                      <>
                        <b>ORDER DELIVERED SUCCESFULLY</b>
                      </>
                    ) : (
                      <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Choose Cetagory</option>
                        {orders.orderStatus === "prosess" && (
                          <option value="Shipped">shipped</option>
                        )}
                        {orders.orderStatus === "Shipped" && (
                          <option value="Delivered">Delivered</option>
                        )}
                      </select>
                    )}
                  </div>
                  {orders.orderStatus === "Delivered" ? (
                    ""
                  ) : (
                    <button
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                      className="btn_pay"
                      onClick={updateOrderSubmitHandler}
                    >
                      UPDATE
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProsessOrder;
