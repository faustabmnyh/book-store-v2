import React from "react";
import "./Payment.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CompletedSteps from "../../Components/CompletedSteps";
import { currency } from "../../Components/Currency";
import OrderSummary from "../../Components/OrderSummary";

const Payment = () => {
  const cart = useSelector((state) => state.cart);
  cart.itemsPrice = cart.cartItems.reduce((a, q) => a + q.price * q.qty, 0);
  cart.shippingPrice = cart.itemsPrice > 200000 ? 0 : 15000;
  cart.taxPrice = 0.2 * cart.itemsPrice;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  return (
    <div>
      <CompletedSteps stepOne stepTwo stepThree />
      <div className="payment">
        <div className="payment__left">
          <ul>
            <div className="payment__container">
              <li>
                <div>
                  <h2>Shipping</h2>
                  <p>
                    <storng>Name : </storng> {cart.shippingAddress.fullName}{" "}
                    <br />
                    <storng>Adddress : </storng> {cart.shippingAddress.address}{" "}
                    <br />
                    <storng>City : </storng> {cart.shippingAddress.city} <br />
                  </p>
                </div>
              </li>
            </div>
            <li>
              <div className="payment__container">
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((cartItem) => (
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
            <OrderSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
