import Axios from "axios";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LISTSEARCH_REQUEST,
  PRODUCT_LISTSEARCH_SUCCESS,
  PRODUCT_LISTSEARCH_FAIL,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_FAIL,
  PRODUCT_CATEGORY_SUCCESS,
} from "../constants/productContants";
import { API_KEY, baseURL, requests } from "../utils/request";

export const listProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const { data } = await Axios.get(requests);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.items });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST });
  try {
    const { data } = await Axios.get(
      `https://www.googleapis.com/books/v1/volumes/${productId}`
    );
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listProductsSearch = (searchProductTitle) => async (dispatch) => {
  dispatch({ type: PRODUCT_LISTSEARCH_REQUEST });
  try {
    const { data } = await Axios.get(
      `${baseURL}q=${searchProductTitle}&maxResults=10&key=${API_KEY}`
    );
    dispatch({ type: PRODUCT_LISTSEARCH_SUCCESS, payload: data.items });
  } catch (err) {
    dispatch({
      type: PRODUCT_LISTSEARCH_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listCategoryProduct = (categoryProduct) => async (dispatch) => {
  dispatch({ type: PRODUCT_CATEGORY_REQUEST });
  try {
    const { data } = await Axios.get(
      `${baseURL}q=subject&printType=${categoryProduct}&key=${API_KEY}`
    );
    console.log(data.items);
    dispatch({ type: PRODUCT_CATEGORY_SUCCESS, payload: data.items });
  } catch (err) {
    dispatch({
      type: PRODUCT_CATEGORY_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.messgae
          : err.message,
    });
  }
};
