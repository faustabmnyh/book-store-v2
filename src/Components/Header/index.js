import React, { useRef, useState } from "react";
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
    if (window.innerWidth <= 768) {
      navMobile.current.classList.remove("show");
    }
  };
  const handleCategory = (e) => {
    history.push(`/category/${e.target.id}`);
    if (window.innerWidth <= 768) {
      navMobile.current.classList.remove("show");
    }
  };

  // navmobile
  const navMobile = useRef(null);
  const handleNavMobile = () => {
    if (window.innerWidth <= 768) {
      navMobile.current.classList.toggle("show");
    }
  };
  return (
    <header>
      <div className="header">
        <Link to="/">
          <img
            className="header__logo"
            src="/images/pictures/store.svg"
            alt=""
          />
        </Link>
        <form className="header__search" onSubmit={handleSearch}>
          <input
            placeholder="Search..."
            className="header__searchInput"
            type="text"
            onChange={(e) => setTitleBook(e.target.value)}
          />
          <button className="header__searchMainIcon" type="submit">
            <SearchIcon className="header__searchIcon" />
          </button>
        </form>
        <div className="header__right">
          <div className="header__category">
            <p className="header__categoryTitle">Category</p>
            <ul className="header__categoryDropdown">
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
              <div className="header__userProfile" onClick={handleNavMobile}>
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

      <ul className="header__navMobile" ref={navMobile}>
        <h4>Profile</h4>
        <li>{userInfo?.username}</li>
        <li onClick={handleNavMobile}>
          <Link to="/signin" onClick={handleSignout}>
            Sign Out
          </Link>
        </li>
        <h4>Shop</h4>
        <li onClick={handleNavMobile}>
          <Link to="/orderhistory">Order History</Link>
        </li>
        <li onClick={handleNavMobile} className="header__mobileCart">
          <Link to="/cart">Cart</Link>
          <p className="header__mobileCartNumber">
            {cartItems.reduce((a, q) => a + q.qty, 0)}
          </p>
        </li>
        <h4>Category</h4>
        <li id="books" onClick={handleCategory}>
          Books
        </li>
        <li id="magazines" onClick={handleCategory}>
          Magazines
        </li>
        <form className="header__searchMobile" onSubmit={handleSearch}>
          <input
            placeholder="Search..."
            className="header__searchInputMobile"
            type="text"
            onChange={(e) => setTitleBook(e.target.value)}
          />
          <button className="header__searchMainIconMobile" type="submit">
            <SearchIcon className="header__searchIconMobile" />
          </button>
        </form>
      </ul>
    </header>
  );
};

export default Header;
