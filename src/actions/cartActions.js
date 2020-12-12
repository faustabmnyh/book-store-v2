import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

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
