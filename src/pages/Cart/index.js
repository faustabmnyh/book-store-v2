import { useState } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../Components/MessageBox";
import { removeFromCart } from "../../actions/cartActions";
import Subtotal from "../../Components/Subtotal";
import { currency } from "../../Components/Currency";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [qty, setQty] = useState(1);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const handleDelete = (productId) => {
    dispatch(removeFromCart(productId));
  };
  console.log(cartItems);
  return (
    <div className="cart">
      <div className="cart__left">
        <h1 className="cart__title">Shopping Cart</h1>
        <hr />
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart Is Empty <Link to="/">Go To Shop</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((cartItem) => (
              <>
                <li className="cart__card" key={cartItem.id}>
                  <div>
                    <img
                      src={cartItem.image}
                      alt={cartItem.title}
                      className="cart__cardImg"
                    />
                  </div>
                  <div className="cart_cardText">
                    <h2 className="cart__cardTitle">
                      {cartItem.title}
                      <span>
                        {cartItem.authors.map((author) => (
                          <div key={author}>
                            by <a href="!#">{author}</a>
                          </div>
                        ))}
                      </span>
                    </h2>
                    <div lassName="cart__cardPrice">
                      <strong>
                        {cartItem.price !== 0
                          ? `IDR ${currency(cartItem.price)}`
                          : "FREE"}
                      </strong>
                    </div>
                    <div className="cart__btnAction">
                      <div className="cart__counter">
                        <p className="cart__counterTitle">Quantity :</p>
                        <div>
                          <button
                            onClick={() => setQty(qty <= 1 ? 1 : qty - 1)}
                            className="cart__counterBtnMinus"
                          >
                            -
                          </button>
                          <input value={qty} className="cart_counterQuantity" />
                          <button
                            onClick={() => setQty(qty + 1)}
                            className="cart__counterBtnPlus"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="cart__btn">
                        <button
                          onClick={() => handleDelete(cartItem.id)}
                          className="cart__cardBtn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
                <hr />
              </>
            ))}
          </ul>
        )}
      </div>
      <div className="cart__right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Cart;
