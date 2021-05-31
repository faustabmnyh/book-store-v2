import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { detailOrder } from "../../actions/orderActions";
import CompletedSteps from "../../Components/CompletedSteps";
import "./Order.css";
import { currency } from "../../Components/Currency";
import LoadingBox from "../../Components/LoadingBox";
import MessageBox from "../../Components/MessageBox";
import CompletedPaymentSummary from "../../Components/CompletedPaymentSummary";

const Order = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  useEffect(() => {
    dispatch(detailOrder(id));
  }, [dispatch, id]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="order">
      <CompletedSteps stepOne stepTwo stepThree stepFour />
      <div className="order__content">
        <div className="order__left">
          <ul>
            <div className="order__container">
              <li className="order__address">
                <h2>Shipping</h2>
                <p>
                  <strong>Order ID : </strong> <strong>{order.id}</strong> <br />
                  <strong>Name : </strong> {order.data.shipping.fullName} <br />
                  <strong>Adddress : </strong> {order.data.shipping.address}{" "}
                  <br />
                  {order.data.shipping.city}, {order.data.shipping.postalCode},{" "}
                  {order.data.shipping.country}
                </p>
              </li>
            </div>
            <li>
              <div className="order__container detail">
                <h2>Order Items</h2>
                <ul>
                  {order.data.orderItems.cartItems.map((cartItem) => (
                    <li key={cartItem.id} className="order__card">
                      <img
                        src={cartItem.image}
                        alt={cartItem.title}
                        className="order__cardImg"
                      />

                      <div className="order__cardBook">
                        <h3 className="order__cardTitle">
                          <Link
                            className="order__titleText"
                            to={`product/${cartItem.id}`}
                          >
                            {cartItem.title}
                          </Link>
                        </h3>
                        <p>
                          IDR {currency(cartItem.price)} x {cartItem.qty} ={" "}
                          <strong>
                            IDR {currency(cartItem.qty * cartItem.price)}
                          </strong>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="order__right">
          <div className="order__container">
            <CompletedPaymentSummary order={order} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
