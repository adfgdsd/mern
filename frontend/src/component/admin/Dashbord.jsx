import React, { useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import "./style.css";
import LineChart from "./chart/LineChart.jsx";
import PaiChart from "./chart/PaiChart.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct, clearError } from "../../actions/productActions";
import { getAllOrders } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/metaData";
import { getAllUsers } from "../../actions/userAction.js";

const Dashbord = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const { product, error } = useSelector((state) => state.AdminProduct);
  const { orders } = useSelector((state) => state.allOrder);
  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch(clearError());
    }
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch, error, Alert]);

  let TotalAmount = 0;
  orders &&
    orders.forEach((items) => {
      TotalAmount += items.totalPrice;
    });

  let listOurofStock = 0;
  product &&
    product.forEach((item) => {
      if (item.stock === 0) {
        listOurofStock += 1;
      }
    });

  const data = {
    labels: ["Initial Amount", "Amount Earn"],
    datasets: [
      {
        label: "Total Amount",
        data: [0, TotalAmount],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };
  const Piedata = {
    labels: ["Outof Stock", "In Stock"],
    datasets: [
      {
        label: "Stock Status",
        data: [listOurofStock, product && product.length - listOurofStock],
        backgroundColor: ["#ff6384", "#4bc0c0"],
        borderColor: ["#00fff2e7"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <MetaData title="Dashbord" />
      <div className="dashBord">
        <Sidebar />
        <div className="dashBordMinContainer">
          <div className="title mt-4">
            <h3>Dashbord</h3>
          </div>
          <br />
          <div className="style_container mt-2">
            <h4 className="p-1">
              Total Amount <br /> tk-{TotalAmount}
            </h4>
          </div>
          <div className="circle_container">
            <div className="circle">
              <h4>
                Product <br /> {product && product.length}
              </h4>
            </div>
            <div className="circle">
              <h4>
                Orders <br /> {orders && orders.length}
              </h4>
            </div>
            <div className="circle">
              <h4>
                User <br /> {users && users.length}
              </h4>
            </div>
          </div>
          <div className="LineChart">
            <LineChart data={data} />
            <PaiChart data={Piedata} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashbord;
