import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "../../Components/MessageBox";
import {
  minusCount,
  plusCount,
  removeFromCart,
} from "../../actions/cartActions";
import Subtotal from "../../Components/Subtotal";
import { currency } from "../../Components/Currency";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const handleDelete = (productId) => {
    dispatch(removeFromCart(productId));
  };

  function getNameAuthor(authors) {
    const getEachAuthor = [];
    authors.map((author) => getEachAuthor.push(author));
    return getEachAuthor.join(", ");
  }

  return (
    <div className="cart">
      <div className="cart__left">
        <h1 className="cart__title">
          Shopping Cart
          <ShoppingCartIcon className="cart__cartIcon" />
        </h1>
        <hr />
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart Is Empty <Link to="/">Go To Shop</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems?.map((cartItem) => (
              <>
                <li className="cart__card" key={cartItem.id}>
                  <img
                    src={cartItem.image}
                    alt={cartItem.title}
                    className="cart__cardImg"
                  />
                  <div className="cart__cardText">
                    <div className="cart__textHeader">
                      <div className="cart__cardTitle">
                        <h2>
                          <Link
                            className="cart__titleText"
                            to={`product/${cartItem.id}`}
                          >
                            {cartItem.title}
                          </Link>
                        </h2>
                        <span>
                          {cartItem.authors.length === 0
                            ? "Unknown"
                            : getNameAuthor(cartItem.authors)}
                        </span>
                      </div>
                      <div className="cart__cardPrice">
                        {cartItem.price !== 0
                          ? `IDR ${currency(cartItem.price)}`
                          : "FREE"}
                      </div>
                    </div>
                    <div className="cart__btnAction">
                      <div className="cart__counter">
                        <p className="cart__counterTitle">Quantity :</p>
                        <div className="cart__conuterInput">
                          <button
                            onClick={() => dispatch(minusCount(cartItem.id))}
                            className={
                              cartItem.qty <= 1
                                ? "cart__btnDisabled"
                                : "cart__counterBtnMinus"
                            }
                          >
                            <RemoveIcon className="cart__counterIcon" />
                          </button>
                          <div className="cart_counterQuantity">
                            {cartItem.qty}
                          </div>
                          <button
                            onClick={() => dispatch(plusCount(cartItem.id))}
                            className="cart__counterBtnPlus"
                          >
                            <AddIcon className="cart__counterIcon" />
                          </button>
                        </div>
                      </div>
                      <div className="cart__btn">
                        <div
                          onClick={() => handleDelete(cartItem.id)}
                          className="cart__cardBtn"
                        >
                          <DeleteIcon className="cart__deleteIcon" />
                          <p>Delete</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
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
