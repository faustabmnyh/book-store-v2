import React from "react";
import "./Payment.css";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CompletedSteps from "../../Components/CompletedSteps";
import { currency } from "../../Components/Currency";
import OrderSummary from "../../Components/OrderSummary";

const Payment = () => {
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  cart.itemsPrice = cart.cartItems.reduce((a, q) => a + q.price * q.qty, 0);
  cart.shippingPrice = cart.itemsPrice > 200000 ? 0 : 15000;
  cart.taxPrice = Math.round(0.05 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  if (!cart.shippingAddress || cart.cartItems.length === 0) {
    history.push("/shipping");
  }
  return (
    <div className="payment container">
      <CompletedSteps stepOne stepTwo stepThree />
      <div className="payment__content">
        <div className="payment__left">
          <ul>
            <div className="payment__container">
              <li className="payment__address">
                <h2>Shipping</h2>
                <p>
                  <strong>Name : </strong> {cart.shippingAddress.fullName}{" "}
                  <br />
                  <strong>Adddress : </strong> {cart.shippingAddress.address}{" "}
                  <br />
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  , {cart.shippingAddress.country}
                </p>
              </li>
            </div>
            <li>
              <div className="payment__container">
                <h2>Order Items</h2>
                <ul>
                  {cart.cartItems.map((cartItem) => (
                    <li key={cartItem.id} className="payment__card">
                      <img
                        src={cartItem.image}
                        alt={cartItem.title}
                        className="payment__cardImg"
                      />

                      <div className="payment__cardBook">
                        <h3 className="payment__cardTitle">
                          <Link
                            className="payment__titleText"
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
