import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminProduct,
  clearError,
  deleteProduct,
} from "../../actions/productActions";
import { NavLink } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import "./css/style.css";
import Sidebar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constents/productConstents";
const ProductList = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const { product, error } = useSelector((state) => state.AdminProduct);
  const { error: DeleteProducterror, isDeleted } = useSelector(
    (state) => state.product
  );

  const deletProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch(clearError());
    }
    if (DeleteProducterror) {
      Alert.error("product not deleted");
    }
    if (isDeleted) {
      Alert.success("success: product deleted");
      dispatch({type:DELETE_PRODUCT_RESET});
    }
    dispatch(getAdminProduct());
  }, [dispatch, error, Alert, DeleteProducterror, isDeleted]);

  const colums = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "name", minWidth: 350, flex: 1 },
    {
      field: "stock",
      type: "number",
      headerName: "stock",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "price",
      type: "number",
      headerName: "price",
      minWidth: 220,
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
            <NavLink to={`/admin/product/${params.getValue(params.id, "id")}`}>
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
                deletProductHandler(params.getValue(params.id, "id"))
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
  product &&
    product.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        stock: item.stock,
        price: item.price,
      });
    });
  return (
    <>
      <div className="product_list">
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
  );
};

export default ProductList;
