import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { currency } from "../Currency";
import "./Subtotal.css";

const Subtotal = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const history = useHistory();
  return (
    <div className="subtotal">
      <p className="subtotal__text">
        Subtotal ({cartItems.reduce((a, q) => a + q.qty, 0)} items) :{" "}
        <strong>
          IDR {currency(cartItems.reduce((a, q) => a + q.price * q.qty, 0))}
        </strong>
      </p>
      <button
        disabled={cartItems.length === 0}
        onClick={() => history.push("/signin?redirect=shipping")}
      >
        Proceed To Checkout
      </button>
    </div>
  );
};

export default Subtotal;
