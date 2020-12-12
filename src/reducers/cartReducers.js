import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

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
            cartItem.id === existProduct.id ? product : cartItem
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, product],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
