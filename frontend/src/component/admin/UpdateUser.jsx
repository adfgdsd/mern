import React, { useState, useEffect } from "react";
import { CLEAR_ERROR } from "../../constents/orderConstents";
import MetaData from "../layout/metaData";
import Sidebar from "./Sidebar";
import Loader from "../loader/loader";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { UPDATE_USER_RESET } from "../../constents/userConstents";
import { getUsersDetails, upadateUser } from "../../actions/userAction";

const UpdateUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const Alert = useAlert();
  const histry = useNavigate();

  const { users, error, loading } = useSelector((state) => state.usersDetailes);
  const {
    loading: UserUpdatesLoading,
    isUpdated,
    error: userUpdateError,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myFrom = new FormData();
    myFrom.set("name", name);
    myFrom.set("email", email);
    myFrom.set("role", role);

    dispatch(upadateUser(id, myFrom));
  };

  useEffect(() => {
    const userID = id;

    if (users && users._id !== userID) {
      dispatch(getUsersDetails(userID));
    } else {
      setName(users.name);
      setRole(users.role);
      setEmail(users.email);
    }
    if (error) {
      Alert.error("SOMETHING IS RONG");
      dispatch({ type: CLEAR_ERROR });
    }
    if (userUpdateError) {
      Alert.error("user not updated");
      dispatch({ type: CLEAR_ERROR });
    }
    if (isUpdated) {
      Alert.success("success: user updated");
      histry("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [Alert, dispatch, error, userUpdateError, isUpdated]);
  return (
    <>
      <MetaData title="Update User (ADMIN)" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="create_product user_sidebar">
            <Sidebar />
            <div className="product_form ">
              <div className="title">Update User</div>
              <form action="">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div>
                  <label htmlFor="name">Email:</label>
                  <input
                    id="number"
                    name="price"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>

                <Button
                  type="submit"
                  onClick={createProductSubmitHandler}
                  disabled={
                    UserUpdatesLoading
                      ? true
                      : false || role === ""
                      ? true
                      : false
                  }
                >
                  create
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateUser;
