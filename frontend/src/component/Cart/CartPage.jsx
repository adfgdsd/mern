import React from "react";
import CartItemCart from "./CartItemCart.jsx";
import { useSelector, useDispatch } from "react-redux";
import { additemsOncart } from "../../actions/cartAction.js";
import { removeItemsOnCart } from "../../actions/cartAction.js";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/metaData.jsx";

const CartPage = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const incrementQuntity = (id, quntaty, stock) => {
    const newQty = quntaty + 1;
    if (stock <= quntaty) {
      return;
    }
    dispatch(additemsOncart(id, newQty));
  };

  const decrementQuntity = (id, quntaty) => {
    const newQty = quntaty - 1;
    if (1 >= quntaty) {
      return;
    }
    dispatch(additemsOncart(id, newQty));
  };

  const deletCartItems = (id) => {
    dispatch(removeItemsOnCart(id));
  };

  const product = () => {
    history("/products")
  };

  const chakeOutHandler = () => {
    history("/user?redirect=shipping")
  }

  return (
    <>
      <MetaData title="Cart Page" />
      {cartItems.length === 0 ? (
        <>
          <div className="no_item">
            <img
              src="https://thumbs.dreamstime.com/b/no-shopping-cart-icon-vector-isolated-illustration-219118085.jpg"
              alt=""
            />
            <p>
              <b>Opps!</b> no items there
            </p>
            <button className="btn m-0" onClick={product}>
              view product
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div
                  key={item.product}
                  className="cartContainer"
                  style={{ borderBottom: "1px solid #afaeae" }}
                >
                  <CartItemCart item={item} deletCartItems={deletCartItems} />

                  <div className="cartInput">
                    <button
                      onClick={(e) =>
                        decrementQuntity(item.product, item.quntaty)
                      }
                    >
                      -
                    </button>
                    <input type="text" readOnly value={item.quntaty} />
                    <button
                      onClick={(e) =>
                        incrementQuntity(item.product, item.quntaty, item.stock)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="subTitile">
                    TK-{item.price * item.quntaty}
                  </div>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div className="min_cart">
                <div className="style"></div>
                <div className="text">
                  <p>Gross Total</p>
                  <p>{`TK- ${cartItems.reduce((acc,item)=> acc+ item.quntaty*item.price,0)}`}</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                  <button className="btn m-0 mt-3" onClick={chakeOutHandler}>Check Out</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartPage;
