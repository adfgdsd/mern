import {
  ADD_TO_CART,
  REMOVE_CART_ITEMS,
  SAVE_SHIPPING_INFO,
} from "../constents/cartConstent";

export const cartReducer = (state = { cartItems: [] ,shipingInfo:{}}, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;
      const isileItemExits = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isileItemExits) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isileItemExits.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_CART_ITEMS:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shipingInfo: action.payload,
      };
    default:
      return { ...state };
  }
};

// const isileItemExits = state.cartItems.find(
//   (i) => i.product === item.product
// );
// if (isileItemExits) {
//   return {
//     ...state,
//     cartItems: state.cartItems.map((i) =>
//       i.product === isileItemExits.product ? item : i
//     ),
//   };
// } else {
//   return {
//     ...state,
//     cartItems: [...state.cartItems, item],
//   };
// }
