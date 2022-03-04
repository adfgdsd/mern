import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { myOrders, clearError } from "../../actions/orderAction";
import { useAlert } from "react-alert";
import { Typography } from "@material-ui/core";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../loader/loader";
import MetaData from "../layout/metaData";
import { NavLink } from "react-router-dom";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const rows = [];
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 ,cellClassName:"header" },
    {
      field: "status",
      headerName: "Status",
      minWidth: 300,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 300,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 300,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 100,
      flex: 0.3,
      cellClassName:"text_center_row",
      sortable: false,
      renderCell: (params) => {
        return (
          <NavLink to={`/order/${params.getValue(params.id, "id")}`}>
            <i class="far fa-share-square"></i>
          </NavLink>
        );
      },
    },
  ];

  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch({ clearError });
    }
    dispatch(myOrders());
  }, [error, Alert, dispatch]);

  return (
    <>
      <MetaData title={`${user.name} -Order`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="myOrderPage">
            <DataGrid
              rows={rows}
              columns={columns}
              autoHeight
              pageSize={10}
              disableSelectionOnClick
              className="myOrderTable"
            />
            <Typography>{`${user.name}'s Orders`}</Typography>
          </div>
        </>
      )}
    </>
  );
};

export default MyOrdersPage;
