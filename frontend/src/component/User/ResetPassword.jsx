import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import Loader from "../loader/loader";

import MetaData from "../layout/metaData";
const ResetPassword = () => {
  const { token } = useParams();
  const history = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { success, loading, error3 } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confrumPassword, setconfromPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myFrom = new FormData();
    myFrom.set("password", password);
    myFrom.set("confrumPassword", confrumPassword);
    if (password === confrumPassword) {
      if (password.length >= 8 || confrumPassword.length >= 8) {
        dispatch(resetPassword(token, myFrom));
      } else {
        alert.error("password must be 8 degites");
      }
    } else {
      alert.error("new and confirm password dosen't meatch");
    }
  };

  useEffect(() => {
    if (error3) {
      alert.error("Opps! " + error3);
      dispatch(clearError());
    }
    if (success) {
      alert.success(success);
      history("/user");
    }
  }, [dispatch, alert, history, success, error3]);

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
                  <label htmlFor="pass2">New Password:</label>
                  <input
                    type="password"
                    id="pass2"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <NavLink to="/user" className="mr-auto">
                  go_back
                </NavLink>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
