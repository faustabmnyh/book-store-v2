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
  const handleBuyNow = () => {
    dispatch(addToCart(product, qty));
    history.push("/signin?redirect=shipping");
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
          ? `IDR ${currency(product.saleInfo.listPrice?.amount)}`
          : product.saleInfo.saleability === "NOT_FOR_SALE"
          ? "NOT FOR SALE"
          : "FREE"}
      </p>
      <div className="checkout__counter">
        <p className="checkout__counterTitle">Quantity :</p>
        <div className="checkout__counterInput">
          <button
            className={"checkout__counterBtnMinus"}
            disabled={
              product.saleInfo.saleability === "NOT_FOR_SALE" || qty <= 1
            }
            onClick={() => setQty(qty <= 1 ? 1 : qty - 1)}
          >
            <RemoveIcon className="checkout__counterIcon" />
          </button>
          <p className="checkout_counterQuantity">
            {product.saleInfo.saleability === "NOT_FOR_SALE" ? 0 : qty}
          </p>
          <button
            className="checkout__counterBtnPlus"
            disabled={product.saleInfo.saleability === "NOT_FOR_SALE"}
            onClick={() => setQty(qty + 1)}
          >
            <AddIcon className="checkout__counterIcon" />
          </button>
        </div>
      </div>
      <div className="checkout__btn">
        <button
          className="checkout__BtnCart"
          onClick={handleAddToCart}
          disabled={product.saleInfo.saleability === "NOT_FOR_SALE"}
        >
          <div className="checkout__imageBtn">
            <LocalGroceryStoreIcon className="checkout__btnIcon" />
          </div>
          <div className="checkout__btnCartName">Add To Cart</div>
        </button>
        <button
          className="checkout__BtnBuy"
          disabled={product.saleInfo.saleability === "NOT_FOR_SALE"}
          onClick={handleBuyNow}
        >
          <div className="checkout__imageBtn">
            <CreditCardIcon className="checkout__btnIcon" />
          </div>
          <div className="checkout__btnBuyName">Buy Now</div>
        </button>
      </div>
    </div>
  );
};

export default Checkout;
