import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { register } from "../../actions/userActions";
import LoadingBox from "../../Components/LoadingBox";
import MessageBox from "../../Components/MessageBox";
import { USER_REGISTER_FAIL } from "../../constants/userConstants";
import "./Register.css";

const Register = ({ location }) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorPassword, setErrorPassword] = useState("");
  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const history = useHistory();
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const handleSubmit = (e) => {
    // setErrorPassword("");
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      setErrorPassword("Password and Confirm Password Must be Match");
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: "",
      });
    } else {
      dispatch(register(values));
    }
  };
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);
  return (
    <div className="register">
      <Link to="/" className="register__logo">
        <img src="/images/pictures/logo.svg" alt="" />
        <span>MR. BOOK</span>
      </Link>
      {loading && <LoadingBox />}

      <div className="register__container">
        <h1>Welcome to Mr. Book</h1>
        <span className="register__text">
          Create account and buy your favorite books only on Mr. Book
        </span>
        {(error || errorPassword) && (
          <MessageBox variant="danger">{error || errorPassword}</MessageBox>
        )}
        <form onSubmit={handleSubmit}>
          <h5>Username</h5>
          <input
            type="text"
            placeholder="Username"
            value={values.username}
            onChange={handleChange("username")}
          />
          <h5>Email</h5>
          <input
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange("email")}
          />
          <h5>Password</h5>
          <input
            type="password"
            placeholder="Password"
            onClick={() => setErrorPassword("")}
            value={values.password}
            onChange={handleChange("password")}
          />
          <h5>Confirm Password</h5>
          <input
            type="password"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
          />

          <button type="submit">Sign Up</button>
        </form>

        <p className="register__btnSignin">
          Already have an account ?{" "}
          <Link
            to={`/signin?redirect=${redirect}`}
            className="register__signinLink"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
