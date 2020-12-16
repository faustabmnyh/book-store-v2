import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { detailOrder } from "../../actions/orderActions";
import CompletedSteps from "../../Components/CompletedSteps";
import { currency } from "../../Components/Currency";
import LoadingBox from "../../Components/LoadingBox";
import MessageBox from "../../Components/MessageBox";
import CompletedPaymentSummary from "../../Components/CompletedPaymentSummary";

const Order = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  console.log(order);
  useEffect(() => {
    dispatch(detailOrder(id));
  }, [dispatch, id]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <CompletedSteps stepOne stepTwo stepThree stepFour />
      <h1>Order {order.id}</h1>
      <div className="payment">
        <div className="payment__left">
          <ul>
            <div className="payment__container">
              <li>
                <div>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name : </strong> {order.data.shipping.fullName}{" "}
                    <br />
                    <strong>Adddress : </strong> {order.data.shipping.address}{" "}
                    <br />
                    {order.data.shipping.city}, {order.data.shipping.postalCode}
                    , {order.data.shipping.country}
                  </p>
                </div>
              </li>
            </div>
            <li>
              <div className="payment__container">
                <h2>Order Items</h2>
                <ul>
                  {order.data.orderItems.cartItems.map((cartItem) => (
                    <li key={cartItem.id}>
                      <div className="payment__card">
                        <div className="payment__cardBook">
                          <img
                            src={cartItem.image}
                            alt={cartItem.title}
                            className="payment__cardImg"
                          />
                          <div className="payment__cardTitle">
                            <Link
                              className="payment__titleText"
                              to={`product/${cartItem.id}`}
                            >
                              {cartItem.title}
                            </Link>
                          </div>
                        </div>
                        <div>
                          IDR {currency(cartItem.price)} x {cartItem.qty} = IDR{" "}
                          {currency(cartItem.qty * cartItem.price)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="payment__right">
          <div className="payment__container">
            <CompletedPaymentSummary
              order={order}
              id={id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
