import React, { useEffect, useRef, useState } from "react";
import CheckOutStape from "./CheckOutStape";
import { Typography } from "@material-ui/core";
import MetaData from "../layout/metaData";
import Loader from "../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { clearError, createOrder } from "../../actions/orderAction";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const Payment = ({ useStripApiKy }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const histry = useNavigate();

  const payBtn = useRef(null);
  const dispatch = useDispatch();
  const Alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();

  const { cartItems, shipingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const {error} = useSelector((state)=>state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalprice * 100)
  }

  const order = {
    shippinfInfo:shipingInfo,
    orderItems:cartItems,
    itemsPrice:orderInfo.subtotal,
    taxPrice:orderInfo.tex,
    shipingPrice:orderInfo.shippingCharg,
    totalPrice:orderInfo.totalprice
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
      const config = {
        "Content-Type": "application/json",
      };
      const { data } = await axios.post(
        `/api/v1/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shipingInfo.address,
              city: shipingInfo.city,
              state: shipingInfo.state,
              postal_code: shipingInfo.pinCode,
              country: shipingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        Alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.payMentInfo={
            id:result.paymentIntent.id,
            status:result.paymentIntent.status,
          }
          dispatch(createOrder(order));
          histry("/success");
        } else {
          Alert.error("something is error");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      Alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
   if(error){
     Alert.error(error)
     dispatch(clearError)
   }
  }, [Alert,error,dispatch])
  


  return (
    <>
      {useStripApiKy ? (
        <>
          <MetaData title="payment" />
          <CheckOutStape activeStep={2} />
          <div className="payment_container">
            <form className="from" onSubmit={(e) => submitHandler(e)}>
              <Typography className="mt-2">Card Info</Typography>
              <div className="mt-2">
                <p>Card No:</p>
                <CardNumberElement className="paymentInfo" />
              </div>
              <div>
                <p>Card Valu:</p>
                <CardCvcElement className="paymentInfo" />
              </div>
              <div>
                <p>Card Key:</p>
                <CardExpiryElement className="paymentInfo" />
              </div>
              <input
                type="submit"
                value={`pay- ${orderInfo && orderInfo.totalprice}`}
                ref={payBtn}
                className="paymentBtn btn m-0 mt-3"
                onClick={submitHandler}
              />
            </form>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Payment;
