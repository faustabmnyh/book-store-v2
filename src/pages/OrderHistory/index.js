import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { orderHistory } from "../../actions/orderActions";

//  todo
// i want the product id
// name product
// product price
// isPaid, isDeliver
// date
// button to go to details payment

const OrderHistory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderHistory());
  }, [dispatch]);
  return (
    <div>
      <h1>Order History</h1>
    </div>
  );
};

export default OrderHistory;
