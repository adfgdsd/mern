import "./App.css";
import { useEffect, useState } from "react";
import Headers from "./component/layout/header/Headers";
import Footer from "./component/layout/footer/Footer";
import Home from "./component/home/Home";
import ProductDetalse from "./component/productDts/ProductDetalse.jsx";
import Productfetchall from "./component/products/product";
import LoginSingUp from "./component/User/loginSingUp";
import UserOptions from "./component/layout/header/userOptions";
import Profile from "./component/User/Profile.jsx";
import UpdateProfile from "./component/User/UpdateProfile.jsx";
import UpdatePassword from "./component/User/UpdatePassword.jsx";
import ForgotPasswordCom from "./component/User/ForgotPasswordCom.jsx";
import ResetPassword from "./component/User/ResetPassword.jsx";
import CartPage from "./component/Cart/CartPage.jsx";
import Shipping from "./component/Cart/Shipping.jsx";
import ConfirmOrder from "./component/Cart/ConfirmOrder.jsx";
import Payment from "./component/Cart/Payment.jsx";
import OrderSuccess from "./component/Cart/OrderSuccess.jsx";
import MyOrdersPage from "./component/Order/MyOrdersPage.jsx";
import OrderDetails from "./component/Order/OrderDetails.jsx";
import Dashbord from "./component/admin/Dashbord.jsx";
import ProductList from "./component/admin/ProductList.jsx"
import UpdateProduct from "./component/admin/UpdateProduct.jsx"
import OrderList from "./component/admin/OrderList.jsx"
import ProsessOrder from "./component/admin/ProcessOrder.jsx"
import UserList from "./component/admin/userList.jsx"
import UpdateUser from "./component/admin/UpdateUser.jsx"
import ProductReviews from "./component/admin/ProductReviews.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Newproduct from "./component/admin/Newproduct";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripApiKy, setuseStripApiKy] = useState("");
  async function getStripApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setuseStripApiKy(data.stripeApiKey);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    getStripApiKey();
  }, [stripApiKy]);

  return (
    <>
      <BrowserRouter>
        <Headers />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetalse />} />
          <Route path="/products" element={<Productfetchall />} />
          <Route path="/products/:keyword" element={<Productfetchall />} />
          <Route path="/user" element={<LoginSingUp />} />
          <Route path="/cart" element={<CartPage />} />

          {isAuthenticated && (
            <Route
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripApiKy)}>
                  <Payment useStripApiKy={stripApiKy} />
                </Elements>
              }
            />
          )}
          {isAuthenticated && (
            <Route path="/order/confirm" element={<ConfirmOrder />} />
          )}
          {isAuthenticated && (
            <Route path="/order/:id" element={<OrderDetails />} />
          )}
          {isAuthenticated && <Route path="/account" element={<Profile />} />}
          {isAuthenticated && (
            <Route path="/me/update" element={<UpdateProfile />} />
          )}
          {isAuthenticated ? (
            <Route path="/password/update" element={<UpdatePassword />} />
          ) : (
            <Route path="/password/update" element={<LoginSingUp />} />
          )}

          {isAuthenticated && (
            <Route path="/user/shipping" element={<Shipping />} />
          )}
          {isAuthenticated ? (
            ""
          ) : (
            <Route path="/password/reset/:token" element={<ResetPassword />} />
          )}
          {isAuthenticated ? (
            ""
          ) : (
            <Route path="/password/forget" element={<ForgotPasswordCom />} />
          )}
          {isAuthenticated ? (
            <Route path="/orders" element={<MyOrdersPage />} />
          ) : (
            <Route path="/orders" element={<LoginSingUp />} />
          )}
          {isAuthenticated ? (
            <Route
              path="/admin/dashbord"
              element={user.role === "Admin" ? <Dashbord /> : <LoginSingUp />}
            />
          ) : (
            <Route path="/admin/dashbord" element={<LoginSingUp />} />
          )}
          {isAuthenticated ? (
            <Route
              path="/admin/products"
              element={user.role === "Admin" ? <ProductList /> : <LoginSingUp />}
            />
          ) : (
            <Route path="/admin/dashbord" element={<LoginSingUp />} />
          )}
           {isAuthenticated ? (
            <Route
              path="/admin/products/create"
              element={user.role === "Admin" ? <Newproduct /> : <LoginSingUp />}
            />
          ) : (
            <Route path="/admin/dashbord" element={<LoginSingUp />} />
          )}
          {isAuthenticated ? (
            <Route
              path="/admin/product/:id"
              element={user.role === "Admin" ? <UpdateProduct /> : <LoginSingUp />}
            />
          ) : (
            <Route path="/admin/dashbord" element={<LoginSingUp />} />
          )}
          {isAuthenticated ? (
            <Route
              path="/admin/orders"
              element={user.role === "Admin" ? <OrderList /> : <LoginSingUp />}
            />
          ) : (
            <Route path="/admin/dashbord" element={<LoginSingUp />} />
          )}
           {isAuthenticated ? (
            <Route
              path="/admin/order/:id"
              element={user.role === "Admin" ? <ProsessOrder /> : <LoginSingUp />}
            />
          ) : (
            <Route path="/admin/dashbord" element={<LoginSingUp />} />
          )}
           {isAuthenticated ? (
            <Route
              path="/admin/users"
              element={user.role === "Admin" ? <UserList /> : <LoginSingUp />}
            />
          ) : (
            <Route path="/admin/dashbord" element={<LoginSingUp />} />
          )}
           {isAuthenticated ? (
            <Route
              path="/admin/user/:id"
              element={user.role === "Admin" ? <UpdateUser /> : <LoginSingUp />}
            />
          ) : (
            <Route path="/admin/dashbord" element={<LoginSingUp />} />
          )}
           {isAuthenticated ? (
            <Route
              path="/admin/reviews"
              element={user.role === "Admin" ? <ProductReviews /> : <LoginSingUp />}
            />
          ) : (
            <Route path="/admin/dashbord" element={<LoginSingUp />} />
          )}
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}
// 15:09
export default App;
