import { useSelector } from "react-redux";
import { currency } from "../Currency";
import "./Subtotal.css";

const Subtotal = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <div className="subtotal">
      <p className="subtotal__text">
        Subtotal ({cartItems.reduce((a, q) => a + q.qty, 0)} items) :{" "}
        <strong>IDR {currency(cartItems.reduce((a, q) => a + q.price, 0))}</strong>
      </p>
      <button>Proceed To Checkout</button>
    </div>
  );
};

export default Subtotal;
