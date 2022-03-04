import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, forgotPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate, NavLink } from "react-router-dom";
import Loader from "../loader/loader";

import MetaData from "../layout/metaData";

const ForgotPasswordCom = () => {
  const history = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, loading, error2 } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const ForgotPasswordSubmit = (e) => {
    e.preventDefault();

    if (email == "") {
      alert.error("inter your email!");
    } else {
      const myFrom = new FormData();
      myFrom.set("email", email);
      dispatch(forgotPassword(myFrom));
    }
  };

  useEffect(() => {
    if (error) {
      alert.error("Opps! " + error);
      dispatch(clearError());
    }
    if (error2) {
      alert.success("success: " + error2);
      dispatch(clearError());
    }
  }, [dispatch, error, alert, history, error2]);

  return (
    <>
      <MetaData title={"Forgot Paaword"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="minn">
            <div className="login_updateProfile">
              <div className="login" style={{ height: "220px" }}>
                <h4 className="mr-auto">Update Profile</h4>
                <form action="">
                  <label htmlFor="emial">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="button"
                    value="Send"
                    onClick={ForgotPasswordSubmit}
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

export default ForgotPasswordCom;
