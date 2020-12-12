import "./Checkout.css";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import FlightIcon from "@material-ui/icons/Flight";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartActions";

const Checkout = ({ product }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product, qty));
  };
  return (
    <div className="checkout">
      <div className="checkout__ship">
        <FlightIcon className="checkout__shipImg" />
        <div className="checkout__shipTetx">
          <h2 className="checkout__shipTitle">Free Shipping</h2>
          <p className="checkout__shipSubtitle">* Terms and Condition</p>
        </div>
      </div>
      <p className="checkout__price">
        {product.saleInfo.listPrice?.amount
          ? `IDR ${product.saleInfo.listPrice?.amount}`
          : "FREE"}
      </p>
      <div className="checkout__counter">
        <p className="checkout__counterTitle">Quantity :</p>
        <div className="checkout__counterInput">
          <button
            className="checkout__counterBtnMinus"
            onClick={() => setQty(qty <= 1 ? 1 : qty - 1)}
          >
            -
          </button>
          <input className="checkout_counterQuantity" value={qty} />
          <button
            className="checkout__counterBtnPlus"
            onClick={() => setQty(qty + 1)}
          >
            +
          </button>
        </div>
      </div>
      <button className="checkout__BtnCart" onClick={handleAddToCart}>
        <LocalGroceryStoreIcon />
        <div className="checkout__btnCartName">Add To Cart</div>
      </button>
      <button className="checkout__BtnBuy">
        <CreditCardIcon />
        <div className="checkout__btnBuyName">Buy Now</div>
      </button>
    </div>
  );
};

export default Checkout;