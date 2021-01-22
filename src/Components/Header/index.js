import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchIcon from "@material-ui/icons/Search";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import { signout } from "../../actions/userActions";

const Header = () => {
  const [titleBook, setTitleBook] = useState("");
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSignout = () => {
    dispatch(signout());
  };
  const handleSearch = () => {
    history.push(`/search/${titleBook}`);
  };
  const handleCategory = (e) => {
    history.push(`/category/${e.target.id}`);
  };
  return (
    <header>
      <div className="header">
        <div>
          <Link to="/">
            <img
              className="header__logo"
              src="/images/pictures/store.svg"
              alt=""
            />
          </Link>
        </div>
        <div className="header__center" onSubmit={handleSearch}>
          <form className="header__search">
            <input
              placeholder="Search..."
              className="header__searchInput"
              type="text"
              onChange={(e) => setTitleBook(e.target.value)}
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
                  <li
                    id="books"
                    onClick={handleCategory}
                    className="dropdown__link"
                  >
                    Books
                  </li>
                  <li
                    id="magazines"
                    onClick={handleCategory}
                    className="dropdown__link"
                  >
                    Magazines
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
                  className="header__avatar"
                />
                <p>{userInfo.username}</p>
              </div>
              <ul className="header__dropdownContent">
                <li>
                  <Link to="/orderhistory">Order History</Link>
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
