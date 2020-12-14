import {
  ADD_SHIPPING_ADDRESS,
  ADD_TO_CART,
  MINUS_COUNT,
  PLUS_COUNT,
  REMOVE_FROM_CART,
} from "../constants/cartConstants";

export const addToCart = (product, qty) => async (dispatch, getState) => {
  dispatch({
    type: ADD_TO_CART,
    payload: {
      id: product.id,
      title: product.volumeInfo.title,
      authors: product.volumeInfo.authors
        ? product.volumeInfo.authors
        : ["DONT KNOW"],
      price: product.saleInfo.listPrice?.amount
        ? product.saleInfo.listPrice?.amount
        : 0,
      image: product.volumeInfo.imageLinks.thumbnail,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const minusCount = (productId, qty) => (dispatch, getState) => {
  dispatch({
    type: MINUS_COUNT,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const plusCount = (productId, qty) => (dispatch, getState) => {
  dispatch({
    type: PLUS_COUNT,
    payload: productId,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (values) => (dispatch) => {
  dispatch({ type: ADD_SHIPPING_ADDRESS, payload: values });
  localStorage.setItem("shipping", JSON.stringify(values));
};
