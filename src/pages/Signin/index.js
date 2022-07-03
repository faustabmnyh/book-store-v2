import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signin } from "../../actions/userActions";
import LoadingBox from "../../Components/LoadingBox";
import MessageBox from "../../Components/MessageBox";
import "./Signin.css";

const Signin = ({ location }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const disaptch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    disaptch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  return (
    <div className="signin">
      <Link to="/" className="signin__logo">
        <img src="/images/pictures/logo.svg" alt="" />
        <span>MR. BOOK</span>
      </Link>
      {/* <Link to="/">
        <img alt="" src="/images/pictures/store.png" />
      </Link> */}
      {loading && <LoadingBox />}
      <div className="signin__container">
        <h1>Welcome Back!</h1>
        <span className="signin__text">
          Hello, enter your credentials to get sign in to your account.
        </span>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <form onSubmit={handleSubmit}>
          <h5>Email</h5>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="singin__btnLogin">
            Sign In
          </button>

          <p className="signin__btnRegister">
            Don't have an account ?{" "}
            <Link
              to={`/register?redirect=${redirect}`}
              className="signin__signinLink"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
