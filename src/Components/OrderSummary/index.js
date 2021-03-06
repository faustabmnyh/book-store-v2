import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createOrder } from "../../actions/orderActions";
import { CREATE_ORDER_RESET } from "../../constants/orderConstants";
import { currency } from "../Currency";
import "./OrderSummary.css";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

const OrderSummary = ({ cart }) => {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, error, success, order } = orderCreate;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const history = useHistory();
  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        ...cart,
        order: {
          orderItems: cart,
          orderTempId: new Date().getTime(),
        },
        userInfo,
        isDelivered: false,
        isPaid: false,
      })
    );
  };
  useEffect(() => {
    if (success) {
      history.push(`/order/${order.order.orderTempId}`);
      dispatch({ type: CREATE_ORDER_RESET });
    }
  }, [dispatch, success, history, order]);
  return (
    <ul className="orderSummary">
      <li>
        <h2>Order Summary</h2>
      </li>
      <li className="orderSummary__item">
        <div>Items</div>
        <div>IDR {currency(cart.itemsPrice)}</div>
      </li>
      <li className="orderSummary__item">
        <div>Shipping</div>
        <div>IDR {currency(cart.shippingPrice)}</div>
      </li>
      <li className="orderSummary__item">
        <div>Tax</div>
        <div>IDR {currency(cart.taxPrice)}</div>
      </li>
      <li className="orderSummary__item">
        <strong>Order Total</strong>
        <strong>IDR {currency(cart.totalPrice)}</strong>
      </li>
      <li>
        <button
          className="orderSummary__btn"
          type="submit"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
      </li>
    </ul>
  );
};

export default OrderSummary;
