import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../loader/loader";

const LoginSingUp = () => {
  const alert = useAlert();
  const history = useNavigate();
  const location = useLocation();
  const { error, loading, isAuthenticated, error2 } = useSelector(
    (state) => state.user
  );

  const register_login = () => {
    const reg = document.querySelector(".reg");
    const log = document.querySelector(".none");
    reg.classList.toggle("hide");
    log.classList.toggle("hide");
  };

  const dispatch = useDispatch();

  const [loginEmail, setLogingEmial] = useState("");
  const [loginPassword, setloginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      alert.error("ERROR: Inter your email and password");
    } else {
      dispatch(login(loginEmail, loginPassword));
    }
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState();
  const [avatarPrev, setavatarPrev] = useState("/userImage.png");

  const { name, email, password } = user;

  const registerDataChanges = (e) => {
    e.preventDefault();

    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setavatarPrev(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert.error("fill all data");
    } else if (password.length < 8) {
      alert.error("password must be 8 desite");
    } else if (!avatar) {
      alert.error("chouse a images");
    } else {
      const myFrom = new FormData();
      myFrom.set("name", name);
      myFrom.set("email", email);
      myFrom.set("password", password);
      myFrom.set("avatar", avatar);

      dispatch(register(myFrom));
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {
    if (error) {
      alert.error("Opps! " + error);
      dispatch(clearError());
    }
    if (error2) {
      alert.error("Opps! " + error2);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      history(`${redirect}`);
    }
  }, [dispatch, error, alert, error2, history, isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="minn">
            <div className="login_register">
              <div className="login none">
                <button className="mr-auto btn" onClick={register_login}>
                  Register Now
                </button>
                <form action="">
                  <label htmlFor="emial">Email:</label>
                  <input
                    value={loginEmail}
                    onChange={(e) => setLogingEmial(e.target.value)}
                    type="email"
                    id="email"
                    name="email"
                  />
                  <label htmlFor="pass">Password:</label>
                  <input
                    value={loginPassword}
                    onChange={(e) => setloginPassword(e.target.value)}
                    type="password"
                    id="pass"
                    name="password"
                  />
                  <a href="/password/forget">forget_passowrd</a>
                  <input type="button" value="SUBMIT" onClick={loginSubmit} />
                </form>
              </div>
              {/* start registation from */}
              <div className="login reg">
                <button className="mr-auto btn" onClick={register_login}>
                  Login Now
                </button>
                <form action="">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={registerDataChanges}
                  />
                  <label htmlFor="emial">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    name="email"
                    onChange={registerDataChanges}
                  />
                  <label htmlFor="pass">Password:</label>
                  <input
                    type="password"
                    id="passs"
                    name="password"
                    value={password}
                    onChange={registerDataChanges}
                  />
                  <div className="registerImages">
                    <img
                      src={avatarPrev}
                      alt="Avatar Preview"
                      className="regimg"
                    />
                    <input
                      type="file"
                      name="avatar"
                      id="images"
                      accept="image/"
                      onChange={registerDataChanges}
                    />
                  </div>
                  <input
                    type="button"
                    value="SUBMIT"
                    onClick={registerSubmit}
                  />
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
// 9:11
// adnanSamiSnato1122@
export default LoginSingUp;
