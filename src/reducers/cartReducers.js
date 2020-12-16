import {
  ADD_SHIPPING_ADDRESS,
  ADD_TO_CART,
  CART_EMPTY,
  MINUS_COUNT,
  PLUS_COUNT,
  REMOVE_FROM_CART,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const product = action.payload;
      const existProduct = state.cartItems.find(
        (cartItem) => cartItem.id === product.id
      );
      if (existProduct) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === existProduct.id
              ? { ...product, qty: cartItem.qty + product.qty }
              : cartItem
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...product, qty: product.qty }],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload
        ),
      };
    case PLUS_COUNT:
      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.id === action.payload
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        ),
      };
    case MINUS_COUNT:
      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.id === action.payload
            ? {
                ...cartItem,
                qty: cartItem.qty <= 1 ? 1 : cartItem.qty - 1,
              }
            : cartItem
        ),
      };
    case ADD_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_EMPTY:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};
