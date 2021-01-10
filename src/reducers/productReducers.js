import {
  PRODUCT_CATEGORY_FAIL,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LISTSEARCH_FAIL,
  PRODUCT_LISTSEARCH_REQUEST,
  PRODUCT_LISTSEARCH_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../constants/productContants";

export const productListReducer = (
  state = { products: [], loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: {}, loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        product: action.payload,
        loading: false,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productSearchListReducer = (
  state = { products: [], loading: true },
  action
) => {
  switch (action.type) {
    case PRODUCT_LISTSEARCH_REQUEST:
      return { loading: true };
    case PRODUCT_LISTSEARCH_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LISTSEARCH_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const productCategorySearchReducer = (
  state = { products: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORY_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_CATEGORY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
