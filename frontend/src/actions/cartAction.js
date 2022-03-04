import {
  ADD_TO_CART,
  REMOVE_CART_ITEMS,
  SAVE_SHIPPING_INFO,
} from "../constents/cartConstent";
import axios from "axios";

// adding product on cart
export const additemsOncart = (id, quntaty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      images: data.product.images[0].url,
      stock: data.product.stock,
      quntaty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// remove items from cart
export const removeItemsOnCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEMS,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// save sphiping info
export const saveShipingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
