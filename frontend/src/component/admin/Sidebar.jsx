import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar_div mt-2">
        <NavLink to="/admin/dashbord">Dashbord</NavLink>
        <div className="all_feature">
          <NavLink to="/admin/products">Products</NavLink>
          <NavLink to="/admin/products/create">Create</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
          <NavLink to="/admin/users">User</NavLink>
          <NavLink to="/admin/reviews">Reviews</NavLink>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
