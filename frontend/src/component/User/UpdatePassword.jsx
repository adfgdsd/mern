import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate, NavLink } from "react-router-dom";
import Loader from "../loader/loader";

import MetaData from "../layout/metaData";
import { UPDATE_PASSWORD_RESET } from "../../constents/userConstents";

const UpdatePassword = () => {
  const history = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, isUpdated2 } = useSelector((state) => state.profile);

  const [Oldpassword, setOldpassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const [confrumPassword, setconfromPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myFrom = new FormData();
    myFrom.set("Oldpassword", Oldpassword);
    myFrom.set("NewPassword", NewPassword);
    myFrom.set("confrumPassword", confrumPassword);
    if (NewPassword === confrumPassword) {
      if (NewPassword.length >= 8 || confrumPassword.length >= 8) {
        dispatch(updatePassword(myFrom));
      } else {
        alert.error("password must be 8 degites");
      }
    } else {
      alert.error("new and confirm password dosen't meatch");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error("Opps! " + "password not update");
      dispatch(clearError());
    }
    if (isUpdated2) {
      alert.success("Update User success");
      history("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated2]);

  return (
    <>
      <MetaData title={"Change Password"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="minn p-5">
            <div className="login_register">
              <div className="login" style={{ height: "auto" }}>
                <h4 className="mr-auto">Change Password</h4>
                <form action="">
                  <label htmlFor="pass1">Old Password:</label>
                  <input
                    type="password"
                    id="passs1"
                    name="password"
                    value={Oldpassword}
                    onChange={(e) => setOldpassword(e.target.value)}
                  />
                  <label htmlFor="pass2">New Password:</label>
                  <input
                    type="password"
                    id="pass2"
                    name="password"
                    value={NewPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <label htmlFor="pass3">Confirm Password:</label>
                  <input
                    type="password"
                    id="pass3"
                    name="password"
                    value={confrumPassword}
                    onChange={(e) => setconfromPassword(e.target.value)}
                  />
                  <input
                    type="button"
                    value="UPDATE"
                    onClick={updatePasswordSubmit}
                  />
                </form>
                <NavLink to="/account" className="mr-auto">go_back</NavLink>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
