import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { register } from "../../actions/userActions";
import LoadingBox from "../../Components/LoadingBox";
import MessageBox from "../../Components/MessageBox";
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
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      setErrorPassword("Password and Confirm Password Must be Match");
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
      <Link to="/">
        <img
          alt=""
          src="/images/pictures/store.png"
          className="register__logo"
        />
      </Link>
      {loading && <LoadingBox />}
      {error && (
        <MessageBox variant="danger">{error || errorPassword}</MessageBox>
      )}
      <div className="register__container">
        <h1>Create New Account</h1>
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
