import React from "react";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchIcon from "@material-ui/icons/Search";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, makeStyles } from "@material-ui/core";
import { signout } from "../../actions/userActions";

const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const Header = () => {
  const classes = useStyles();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const handleSignout = () => {
    dispatch(signout());
  };
  return (
    <header>
      <div className="header">
        <div>
          <Link to="/">
            <img
              className="header__logo"
              src="/images/pictures/store.png"
              alt=""
            />
          </Link>
        </div>
        <div className="header__center">
          <form className="header__search">
            <input
              placeholder="Search..."
              className="header__searchInput"
              type="text"
            />
            <button className="header__seacrhMainIcon" type="submit">
              <SearchIcon className="header__searchIcon" />
            </button>
          </form>
        </div>
        <div className="header__right">
          <div className="header__category">
            <div className="header__categoryMain">
              <p className="header__categoryTitle">Category</p>
              <div className="header__categoryDropdown">
                <ul className="dropdown__item">
                  <li>
                    <a href="!#" className="dropdown__link">
                      Hardcover
                    </a>
                  </li>
                  <li>
                    <a href="!#" className="dropdown__link">
                      Paperback
                    </a>
                  </li>
                  <li>
                    <a href="!#" className="dropdown__link">
                      E-Book
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Link to="/cart">
            <div className="header__cart">
              <ShoppingCartOutlinedIcon className="header__cartIcon" />
              <p className="header__cartNumber">
                {cartItems.reduce((a, q) => a + q.qty, 0)}
              </p>
            </div>
          </Link>
          {userInfo ? (
            <div className="header__userProfileDropdown">
              <div className="header__userProfile">
                <Avatar
                  alt="girls"
                  src="/images/pictures/avatar.jpg"
                  className={classes.small}
                />
                <p>{userInfo.username}</p>
              </div>
              <ul className="header__dropdownContent">
                <li>
                  <Link to="/orderhistory">
                    Order History 
                  </Link>
                </li>
                <li>
                  <Link to="/signin" onClick={handleSignout}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <>
              {" "}
              <div className="header__auth">
                <Link to="/signin">
                  <button className="header__signin">Sign In</button>
                </Link>
                <Link to="/register">
                  <button className="header__signup">Sign Up</button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
