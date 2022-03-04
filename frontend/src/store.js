import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  newReviewReducer,
  productDetalseReducer,
  productReducer,
  AdminproductReducer,
  newProductReducer,
  productsReducer,
  reviewsReducer,
  reviewsDetalseReducer,
} from "./reducer/productReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  ForgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
  usersReducer,
} from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducer/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetalse: productDetalseReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: ForgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  AdminProduct: AdminproductReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrder: allOrdersReducer,
  orders: orderReducer,
  allUsers: usersReducer,
  usersDetailes: userDetailsReducer,
  productReviews:reviewsDetalseReducer,
  review:reviewsReducer
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shipingInfo: localStorage.getItem("shipingInfo")
      ? JSON.parse(localStorage.getItem("shipingInfo"))
      : [],
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
