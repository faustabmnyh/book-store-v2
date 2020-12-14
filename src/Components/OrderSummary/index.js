import React from "react";
import { currency } from "../Currency";
import "./OrderSummary.css";

const OrderSummary = ({ cart }) => {
  return (
    <ul className="orderSummary">
      <li>
        <h2>Order Summary</h2>
      </li>
      <li>
        <div className="orderSummary__item">
          <div>Items</div>
          <div>IDR {currency(cart.itemsPrice)}</div>
        </div>
      </li>
      <li>
        <div className="orderSummary__item">
          <div>Shipping</div>
          <div>IDR {currency(cart.shippingPrice)}</div>
        </div>
      </li>
      <li>
        <div className="orderSummary__item">
          <div>Tax</div>
          <div>IDR {currency(cart.taxPrice)}</div>
        </div>
      </li>
      <li>
        <div className="orderSummary__item">
          <div>
            <strong>Order Total</strong>
          </div>
          <div>
            <strong>IDR {currency(cart.totalPrice)}</strong>
          </div>
        </div>
      </li>
      <li>
        <div>
          <button className="orderSummary__btn" type="submit">
            Place Order
          </button>
        </div>
      </li>
    </ul>
  );
};

export default OrderSummary;
