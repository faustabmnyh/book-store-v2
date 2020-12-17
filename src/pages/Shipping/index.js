import React, { useState } from "react";
import "./Shipping.css";
import CompletedSteps from "../../Components/CompletedSteps";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { saveShippingAddress } from "../../actions/cartActions";

const Shipping = () => {
const dispatch = useDispatch();
  const history = useHistory();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;
  const [values, setValues] = useState({
    fullName: shippingAddress.fullName,
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country,
  });
  if (!userInfo && cartItems.length === 0) {
    history.push("/signin");
  }
  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(values));
    history.push("/payment");
  };
  return (
    <div className="shipping">
      <CompletedSteps stepOne stepTwo />
      <div className="shipping__container">
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Shipping Address</h1>
          </div>
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              placeholder="Full Name"
              value={values.fullName}
              onChange={handleChange("fullName")}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              value={values.address}
              onChange={handleChange("address")}
              required
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              placeholder="City"
              value={values.city}
              onChange={handleChange("city")}
              required
            />
          </div>
          <div>
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              placeholder="Postal Code"
              value={values.postalCode}
              onChange={handleChange("postalCode")}
              required
            />
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              placeholder="Country"
              value={values.country}
              onChange={handleChange("country")}
              required
            />
          </div>
          <div>
            <button className="shipping__btn" type="submit">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
