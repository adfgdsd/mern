import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/metaData";
import Loader from "../loader/loader";
import { clearError } from "../../actions/productActions";
import { NavLink } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import "./css/style.css";
import Sidebar from "./Sidebar";
import { deleteOrder, getAllOrders } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constents/orderConstents";

const OrderList = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();

  const { orders, error, loading } = useSelector((state) => state.allOrder);
  const { error: DeleteProducterror, isDeleted } = useSelector(
    (state) => state.orders
  );

  const deletOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const colums = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 1,
      cellClassName: "header",
    },
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
      field: "Action",
      type: "number",
      headerName: "action",
      minWidth: 150,
      sortable: false,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <i class="fal fa-edit"></i>
            </NavLink>
            <Button
              style={{
                color: "red",
                outline: "none",
                border: "none",
                marginLeft: "10px",
                cursor: "pointer",
              }}
              onClick={() =>
                deletOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <i class="fas fa-archive"></i>
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        status: item.orderStatus,
        price: item.price,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch(clearError());
    }
    if (DeleteProducterror) {
      Alert.error("product not deleted");
    }
    if (isDeleted) {
      Alert.success("success: order deleted");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
  }, [dispatch, error, Alert, DeleteProducterror, isDeleted]);

  return (
    <>
      <MetaData title="Order's Admin" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="product_list orders_admin">
            <Sidebar />
            <div className="rows">
              <DataGrid
                columns={colums}
                rows={rows}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
                className="dataGrid"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OrderList;
