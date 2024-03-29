import { CART_EMPTY } from "../constants/cartConstants";
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_FAIL,
  ORDER_HISTORY_SUCCESS,
} from "../constants/orderConstants";
import { db } from "../utils/firebase";

// we want to add the all to

export const createOrder = (order) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: order });
    db.ref(`orders/${order.order.orderTempId}`).push({
      name: order.userInfo.username,
      userId: order.userInfo.id,
      orderItems: order.order.orderItems,
      price: order.totalPrice,
      shipping: order.shippingAddress,
      isPaid: order.isPaid,
      isDelivered: order.isDelivered,
      orderTempId: order.order.orderTempId,
      orderAt: Date.now(),
    });
    // this is for order history each user
    db.ref(`orders_history/${order.userInfo.id}`).push({
      name: order.userInfo.username,
      userId: order.userInfo.id,
      orderItems: order.order.orderItems,
      price: order.totalPrice,
      shipping: order.shippingAddress,
      isPaid: order.isPaid,
      isDelivered: order.isDelivered,
      orderTempId: order.order.orderTempId,
      orderAt: Date.now(),
    });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem("cartItems");
  } catch (err) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const detailOrder = (orderTempId) => async (dispatch) => {
  dispatch({ type: ORDER_DETAILS_REQUEST });
  try {
    const data = await db.ref(`orders/${orderTempId}`);
    data.on("value", (values) => {
      const dataOrder = [];
      Object?.keys(values.val()).map((value) =>
        dataOrder.push({
          id: value,
          data: values.val()[value],
        })
      );
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: dataOrder[0],
      });
    });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const orderPayment = (order, paymentResult) => async (dispatch) => {
  dispatch({ type: ORDER_PAY_REQUEST });
  try {
    const dataUpdate = await db.ref(
      `orders/${order.data.orderTempId}/${order.id}`
    );
    dataUpdate.set(
      {
        price: order.data.price,
        name: order.data.name,
        userId: order.data.userId,
        isDelivered: false,
        orderPaidAt: paymentResult.create_time,
        isPaid: true,
        paidAt: Date.now(),
        orderTempId: order.data.orderTempId,
        shipping: order.data.shipping,
        orderItems: order.data.orderItems,
        orderAt: order.data.orderAt,
      },
      (err) => {
        return err;
      }
    );
    const data = await db.ref(`orders/${order.data.orderTempId}`);
    data.on("value", (values) => {
      const dataOrder = [];
      Object?.keys(values.val()).map((value) =>
        dataOrder.push({
          id: value,
          data: values.val()[value],
        })
      );
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: dataOrder[0],
      });
    });
  } catch (err) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const orderHistory = (userId) => async (dispatch) => {
  dispatch({ type: ORDER_HISTORY_REQUEST });
  try {
    const data = await db.ref(`orders_history/${userId}`);

    data.on("value", (values) => {
      console.log(values);
      const dataOrder = [];
      if (values) {
        Object?.keys(values.val() || {}).map((value) =>
          dataOrder.push({
            id: value,
            data: values.val()[value],
          })
        );
        dispatch({
          type: ORDER_HISTORY_SUCCESS,
          payload: dataOrder,
        });
      }
    });
  } catch (err) {
    dispatch({
      type: ORDER_HISTORY_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
