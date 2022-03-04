import React from "react";
import { logout } from "../../../actions/userAction";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserOptions = ({ user }) => {
  const alert = useAlert();
  const history = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const Account = () => {
    history("/account");
  };
  const Order = () => {
    history("/orders");
  };
  const Cart = () => {
    history("/cart");
  };
  const dashbord = () => {
    history("/admin/dashbord");
  };
  const logoutUser = (e) => {
    alert.success("logout success");
    e.preventDefault();
    dispatch(logout());
  };

  //
  const options = [
    {
      icon: <i class="fas fa-money-check-alt"></i>,
      name: "Orders",
      func: Order,
    },
    { icon: <i class="fas fa-user-alt"></i>, name: "Account", func: Account },
    {
      icon: (
        <i
          class="fal fa-cart-plus cart_icon"
          style={{ color: cartItems.length > 0 ? "tomato" : "gray" }}
        ></i>
      ),
      name: `Cart ${cartItems.length}`,
      func: Cart,
    },
    {
      icon: <i class="fas fa-sign-out-alt"></i>,
      name: "Logout",
      func: logoutUser,
    },
  ];

  if (user.role === "Admin") {
    options.unshift({
      icon: <i class="fas fa-border-all"></i>,
      name: "D-bord",
      func: dashbord,
    });
  }

  // show and hide element

  const show = () => {
    const options = document.querySelector(".op");
    // const hide_div = document.querySelector(".hide_div");

    options.style.display = "block";
    // hide_div.style.display = "block";
  };

  const hide = () => {
    const options = document.querySelector(".op");
    // const hide_div = document.querySelector(".hide_div");

    options.style.display = "none";
    // hide_div.style.display = "none";
  };

  const noneDiv = () => {
    const options = document.querySelector(".img_div_");
    const hide_div = document.querySelector(".options");
    const btn_toggle = document.querySelector(".btn_toggle");
    const min_div = document.querySelector(".min_div");
    const op = document.querySelector(".op");

    if (btn_toggle.innerHTML === "+") {
      options.style.display = "flex";
      hide_div.style.display = "flex";
      op.style.display = "none";
      min_div.style.zIndex = "1";
      btn_toggle.innerHTML = "x";
    } else {
      options.style.display = "none";
      hide_div.style.display = "none";
      min_div.style.zIndex = "-1";
      op.style.display = "none";
      btn_toggle.innerHTML = "+";
    }
  };

  return (
    <>
      <button
        style={{
          border: "none",
          outline: "none",
          cursor: "pointer",
          position: "fixed",
          right: "20px",
          top: "12vh",
          background: "none",
          fontSize: "1.5rem",
          color: "tomato",
        }}
        className="btn_toggle"
        onClick={noneDiv}
      >
        x
      </button>
      <div className="hide_div" style={{ zIndex: "9" }}></div>
      <div className="min_div min_div2" onMouseMove={show} onMouseOut={hide}>
        <div className="img_div_" onMouseMove={show} onMouseOut={hide}>
          <img src={user.avatar.url} alt="" />
        </div>
        <div className="options" onMouseMove={show} onMouseOut={hide}>
          <ul className="op">
            {options.map((e) => (
              <li key={e.name} onClick={e.func}>
                {e.icon} {e.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserOptions;
