import React,{useEffect} from "react";
import CheckOutStape from "./CheckOutStape";
import MetaData from "../layout/metaData";
import { useSelector} from "react-redux";
import { Typography } from "@material-ui/core";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../loader/loader";

const ConfirmOrder = () => {
  const histry = useNavigate();
  const { user, loading } = useSelector((state) => state.user);
  const { cartItems, shipingInfo } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quntaty * item.price,
    0
  );

  const shippingCharg = subtotal > 1000 ? 200 : 0;
  const tex = subtotal * 0.18;
  const totalprice = subtotal + shippingCharg + tex;
  const adress = `${shipingInfo.adress},${shipingInfo.city},${shipingInfo.state},${shipingInfo.pinCode},${shipingInfo.country}`;

  const ProcessToPayment = () => {
    const data = {
      subtotal,
      shippingCharg,
      tex,
      totalprice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    histry("/process/payment");
  };


  useEffect(() => {
    if(shipingInfo.length === 0){
      histry("/user/shipping")
    }
  }, [cartItems])
  


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Confirm Order" />
          <CheckOutStape activeStep={1} />
          <div className="confirm_order">
            <div>
              <div className="confirm_shipping_ariam">
                <Typography>Shipping Info</Typography>
                <div className="confirm_shipping_aria_box">
                  <div>
                    <p>Name:</p>
                    <span>{user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{shipingInfo.phoneNo}</span>
                  </div>
                  <div>
                    <p>Adress:</p>
                    <span>{adress}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{shipingInfo.phoneNo}</span>
                  </div>
                </div>
                <div className="confirm_cart_items">
                  <Typography>Your Cart Items</Typography>
                  <div className="confirm_cart_items_container">
                    {cartItems &&
                      cartItems.map((item, i) => (
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
              <div className="order_summery">
                <Typography className="p">Order Summery</Typography>
                <div>
                  <div>
                    <p>Subtotal:</p>
                    <span>TK-{subtotal}</span>
                  </div>
                  <div>
                    <p>Shipping Charges:</p>
                    <span>TK-{shippingCharg}</span>
                  </div>
                  <div>
                    <p>GST:</p>
                    <span>TK-{String(tex).substring(0, 6)}</span>
                  </div>
                </div>
                <div className="order_summery_total">
                  <p>
                    <b>Total:</b>
                  </p>
                  <span>{Math.floor(totalprice)}</span>
                </div>
                <button className="btn_pay" onClick={ProcessToPayment}>
                  Process To Payment
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ConfirmOrder;
