import Cookies from 'js-cookie';
import GLOBALS from '../../Globals'
let numberCart = Cookies.get("numberCart") && Cookies.get("numberCart") != 'undefined' ? Cookies.get("numberCart") : 0;
let cartItemsJson = Cookies.get("cartItems") || "undefined";
let cartItemsArray = cartItemsJson != 'undefined' && JSON.parse(cartItemsJson) ? JSON.parse(cartItemsJson) : [];
export const cartReducer = (
  state = { cartItems: cartItemsArray, numberCart: numberCart },
  action
) => {
  switch (action.type) {
    case GLOBALS.cart.FETCH_TO_CART:
      return { cartItems: action.payload.cartItems, numberCart: action.payload.numberCart, countFreeSample: action.payload.countFreeSample };
    case GLOBALS.cart.ADD_TO_CART:
      return { cartItems: action.payload.cartItems, numberCart: action.payload.numberCart, countFreeSample: action.payload.countFreeSample };
    case GLOBALS.cart.REMOVE_FROM_CART:
      return { cartItems: action.payload.cartItems, numberCart: action.payload.numberCart, countFreeSample: action.payload.countFreeSample };
    case GLOBALS.cart.INCREMENT:
      return { cartItems: action.payload.cartItems, numberCart: action.payload.numberCart, countFreeSample: action.payload.countFreeSample };
    case GLOBALS.cart.DECREMENT:
      return { cartItems: action.payload.cartItems, numberCart: action.payload.numberCart, countFreeSample: action.payload.countFreeSample };
    default:
      return state;
  }
};

