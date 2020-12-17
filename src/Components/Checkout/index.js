import "./Checkout.css";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import FlightIcon from "@material-ui/icons/Flight";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import { currency } from "../Currency";
import { useHistory } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";


const Checkout = ({ product }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleAddToCart = () => {
    history.push("/cart");
    dispatch(addToCart(product, qty));
  };
  return (
    <div className="checkout">
      <div className="checkout__container">
        <div className="checkout__ship">
          <FlightIcon className="checkout__shipImg" />
          <div className="checkout__shipTetx">
            <h2 className="checkout__shipTitle">Free Shipping</h2>
            <p className="checkout__shipSubtitle">* Terms and Condition</p>
          </div>
        </div>
        <p className="checkout__price">
          {product.saleInfo.listPrice?.amount
            ? `IDR ${currency(product.saleInfo.listPrice?.amount)}`
            : "FREE"}
        </p>
        <div className="checkout__counter">
          <p className="checkout__counterTitle">Quantity :</p>
          <div className="checkout__counterInput">
            <button
              className={
                qty <= 1
                  ? "checkout__counterBtnMinusDisabled"
                  : "checkout__counterBtnMinus"
              }
              onClick={() => setQty(qty <= 1 ? 1 : qty - 1)}
            >
              <RemoveIcon style={{fontSize: "15px"}} />
            </button>
            <p className="checkout_counterQuantity">{qty}</p>
            <button
              className="checkout__counterBtnPlus"
              onClick={() => setQty(qty + 1)}
            >
              <AddIcon  style={{fontSize: "15px"}}/>
            </button>
          </div>
        </div>
        <div className="checkout__btn">
          <button className="checkout__BtnCart" onClick={handleAddToCart}>
            <div className="checkout__imageBtn">
              <LocalGroceryStoreIcon />
            </div>
            <div
              className="checkout__btnCartName"
              onClick={() => history.push("/cart")}
            >
              Add To Cart
            </div>
          </button>
          <button className="checkout__BtnBuy">
            <div className="checkout__imageBtn">
              <CreditCardIcon />
            </div>
            <div className="checkout__btnBuyName">Buy Now</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
