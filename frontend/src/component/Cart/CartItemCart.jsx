import React from "react";
import { NavLink } from "react-router-dom";

const CartItemCart = ({ item,deletCartItems }) => {
  return (
    <>
      <div className="cartItemsClass">
        <img src={item.images} alt="" />
        <div>
          <NavLink to={`/product/${item.product}`}>{item.name}</NavLink>
          <span>{`Price TK- ${item.price}`}</span>
          <p className="remove" onClick={()=>deletCartItems(item.product)}>remove</p>
        </div>
      </div>
    </>
  );
};

export default CartItemCart;
