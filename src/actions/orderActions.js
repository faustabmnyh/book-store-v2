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

// we gonna change orderTempId dengan user id

export const createOrder = (order) => async (dispatch) => {
  dispatch({ type: CREATE_ORDER_REQUEST });
  try {
    dispatch({ type: CREATE_ORDER_SUCCESS, payload: order });
    db.ref(`orders/${order.order.orderTempId}`).push({
      name: order.userInfo.username,
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
  console.log("this is payment", paymentResult);

  dispatch({ type: ORDER_PAY_REQUEST });
  try {
    const dataUpdate = await db.ref(
      `orders/${order.data.orderTempId}/${order.id}`
    );
    dataUpdate.set(
      {
        price: order.data.price,
        name: order.data.name,
        isDelivered: false,
        orderPaidAt: paymentResult.create_time,
        isPaid: true,
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

export const orderHistory = () => async (dispatch) => {
  dispatch({ type: ORDER_HISTORY_REQUEST });
  try {
    const data = await db.ref("orders");
    data.on("value", (values) => {
      const dataOrder = [];
      Object?.keys(values.val()).map(
        (value) => console.log(values.val()[value])
        // dataOrder.push({
        //   id: value,
        //   data: values.val()[value],
        // })
      );

      // console.log(dataOrder);
      // dispatch({
      //   type: ORDER_PAY_SUCCESS,
      //   payload: dataOrder[0],
      // });
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
