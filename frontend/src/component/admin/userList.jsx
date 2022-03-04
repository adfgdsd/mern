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
import { deleteUser, getAllUsers } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constents/userConstents";

const UserList = () => {
  const dispatch = useDispatch();
  const Alert = useAlert();
  const { loading, users, error } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.profile);

  const deleteUserAllData = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      Alert.error(error);
      dispatch(clearError());
    }

    if (isDeleted) {
      Alert.success("deleted");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, isDeleted]);

  const colums = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },
    {
      field: "email",
      headerName: "Email",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 120,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "Admin"
          ? "greenColor"
          : "";
      },
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 150,
      type: "number",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <i class="fal fa-edit"></i>
            </NavLink>
            {params.getValue(params.id, "role") !== "Admin" ? (
              <Button
                style={{
                  color: "red",
                  outline: "none",
                  border: "none",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  deleteUserAllData(params.getValue(params.id, "id"))
                }
              >
                <i class="fas fa-archive"></i>
              </Button>
            ) : (
              ""
            )}
          </>
        );
      },
    },
  ];

  const rows = [];
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        price: item.price,
        name: item.name,
      });
    });
  return (
    <>
      <div className="product_list userList">
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

export default UserList;
