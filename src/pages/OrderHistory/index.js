import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { orderHistory } from "../../actions/orderActions";
import LoadingBox from "../../Components/LoadingBox";
import MessageBox from "../../Components/MessageBox";
import "./OrderHistory.css";
import { currency } from "../../Components/Currency";
import { addToCart } from "../../actions/cartActions";
// import { addToCart } from "../../actions/cartActions";

const OrderHistory = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const histroyOrder = useSelector((state) => state.orderHistory);
  const { orders, loading, error } = histroyOrder;
  const dispatch = useDispatch();
  const history = useHistory();
  if (!userInfo) {
    history.push("/signin");
  }
  useEffect(() => {
    dispatch(orderHistory(userInfo.id));
  }, [dispatch, userInfo]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="orderHistory">
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <MessageBox>
          You haven't done place an order, <Link to="/">Go To Shop</Link>
        </MessageBox>
      ) : (
        orders.map((order) => (
          <div className="orderHistory__content">
            <div className="orderHistory__container" key={order.id}>
              <div>
                <ul className="orderHistory__header">
                  <li>
                    <p className="orderHistory__orderAt">
                      {moment(order.data.orderAt).format("MMMM do YYYY, h:mma")}
                    </p>
                  </li>
                  <li>
                    <h2>{order.id}</h2>
                  </li>
                </ul>
              </div>
              {order.data.orderItems.cartItems.map((cartItem) => (
                <div className="orderHistory__body" key={cartItem.id}>
                  <div>
                    <img src={cartItem.image} alt={cartItem.title} />
                  </div>
                  <div className="orderHistory__bodyContent">
                    <div>
                      <Link to={`/product/${cartItem.id}`}>
                        <h2>{cartItem.title}</h2>
                      </Link>
                      <div className="orderHistory__item">
                        {cartItem.qty} item
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="orderHistory__bodyBot">
                <div className="orderHistory__price">
                  <p>Total Price :</p>
                  <strong>IDR {currency(order.data.price)}</strong>
                </div>
                <div className="orderHistory__bodyBotBtn">
                  <div>
                    <button
                      onClick={() =>
                        history.push(`/order/${order.data.orderTempId}`)
                      }
                    >
                      Go To Details Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
