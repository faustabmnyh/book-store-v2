import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ORDER_PAY_RESET } from "../../constants/orderConstants";
import { currency } from "../Currency";
import { PayPalButton } from "react-paypal-button-v2";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import "./CompletedPaymentSummary.css";
import { detailOrder, orderPayment } from "../../actions/orderActions";

const CompletedPaymentSummary = ({ order, id }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const orderPayments = useSelector((state) => state.orderPayment);
  const {
    loading: loadingPayment,
    error: errorPayment,
    success: successPayment,
  } = orderPayments;
  const dispatch = useDispatch();
  console.log((order.data.orderItems.totalPrice / 14000).toFixed(2));
  useEffect(() => {
    console.log(process.env.REACT_APP_PAYPAL_CLIENT_ID);
    const addPaypalScript = async () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${
        process.env.REACT_APP_PAYPAL_CLIENT_ID || "sb"
      }`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    console.log(order);
    if (
      !order ||
      successPayment ||
      (order && order.data.orderTempId !== Number(id))
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(detailOrder(Number(id)));
    } else {
      if (!order.data.isPaid) {
        if (!window.paypal) {
          addPaypalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [id, dispatch, order, sdkReady, successPayment]);
  console.log("order", order);
  const handleSuccessPayment = (paymentResult) => {
    dispatch(orderPayment(order, paymentResult));
  };
  return (
    <ul className="completedPaymentSummary">
      <li>
        <h2>Order Summary</h2>
      </li>
      <li>
        <div className="completedPaymentSummary__item">
          <div>Items</div>
          <div>IDR {currency(order.data.orderItems.itemsPrice)}</div>
        </div>
      </li>
      <li>
        <div className="completedPaymentSummary__item">
          <div>Shipping</div>
          <div>IDR {currency(order.data.orderItems.shippingPrice)}</div>
        </div>
      </li>
      <li>
        <div className="completedPaymentSummary__item">
          <div>Tax</div>
          <div>IDR {currency(order.data.orderItems.taxPrice)}</div>
        </div>
      </li>
      <li>
        <div className="completedPaymentSummary__item lastPaySum">
          <div>
            <strong>Order Total</strong>
          </div>
          <div>
            <strong>IDR {currency(order.data.orderItems.totalPrice)}</strong>
          </div>
        </div>
      </li>
      <li>
        <div>
          {order.data.isPaid ? (
            <MessageBox variant="success">{order.data.orderPaidAt}</MessageBox>
          ) : (
            <MessageBox variant="danger">Waiting for payment</MessageBox>
          )}
        </div>
      </li>
      {!order.data.isPaid && (
        <li>
          {!sdkReady ? (
            <LoadingBox />
          ) : (
            <>
              {errorPayment && (
                <MessageBox variant="danger">{errorPayment}</MessageBox>
              )}
              {loadingPayment && <LoadingBox />}
              <PayPalButton
                amount={(order.data.orderItems.totalPrice / 14000).toFixed(2)}
                onSuccess={handleSuccessPayment}
              />
            </>
          )}
        </li>
      )}
    </ul>
  );
};

export default CompletedPaymentSummary;
