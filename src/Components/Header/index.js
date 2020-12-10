import React from "react";
import { Link } from "react-router-dom";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import SearchIcon from "@material-ui/icons/Search";
import "./Header.css";

const Header = () => {
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
              <LocalGroceryStoreIcon className="header__cartIcon" />
              <p className="header__cartNumber">0</p>
            </div>
          </Link>
          <div className="header__auth">
            <Link to="/signin">
              <button className="header__signin">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="header__signup">Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
