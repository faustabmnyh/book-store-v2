import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../../actions/cartActions";
import { currency } from "../Currency";

const SearchProductContainer = ({ product, truncate, dispatch }) => {
  return (
    <div >
      <div className="searchPage__container">
        <div>
          <Link to={`/product/${product.id}`}>
            <img
              src={product.volumeInfo.imageLinks?.thumbnail}
              alt="books"
              className="searchPage__image"
            />
          </Link>
        </div>
        <div className="searchPage__body">
          <div className="searchPage__bodyHeader">
            <Link to={`/product/${product.id}`}>
              <h2>{product.volumeInfo.title}</h2>
            </Link>
            <div className="searchPage__authors">
              {product.volumeInfo.authors ? (
                product.volumeInfo.authors?.map((author) => (
                  <div key={author}>{author}</div>
                ))
              ) : (
                <div>Unknown</div>
              )}
            </div>
            <div className="searchPage__bodyBody">
              {truncate(product?.volumeInfo.description, 200)}
            </div>
          </div>
          <div className="searchPage__bodyFooter">
            <p>
              {product.saleInfo.listPrice?.amount
                ? `IDR ${currency(product.saleInfo.listPrice?.amount)}`
                : product.saleInfo.saleability === "NOT_FOR_SALE"
                ? "NOT FOR SALE"
                : "FREE"}
            </p>
            <div>
              {product.saleInfo.saleability === "NOT_FOR_SALE" ? null : (
                <button onClick={() => dispatch(addToCart(product, 1))}>
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProductContainer;
