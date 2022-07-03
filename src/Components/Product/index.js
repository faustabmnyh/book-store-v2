import { Link } from "react-router-dom";
import "./Product.css";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartActions";
import { currency } from "../Currency";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product, 1));
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div className="product">
      <Link to={`/product/${product.id}`}>
        <img
          className="product__image medium"
          src={product.volumeInfo.imageLinks?.thumbnail}
          alt="books"
        />
      </Link>
      <div className="product__text">
        <div>
          <Link to={`/product/${product.id}`}>
            <h2 className="product__title">
              {truncate(product.volumeInfo.title, 25)}
            </h2>
          </Link>
          {product.volumeInfo.authors ? (
            <div className="product__author">
              {truncate(product.volumeInfo.authors[0], 30)}
            </div>
          ) : (
            <div className="product__author">Unknown</div>
          )}
          <p
            className="product__description"
            dangerouslySetInnerHTML={{
              __html: truncate(product.volumeInfo.description, 120),
            }}
          />
        </div>
        <div className="product__prices">
          <p className="product__price price">
            {product.saleInfo.listPrice?.amount
              ? `IDR ${currency(product.saleInfo.listPrice?.amount)}`
              : product.saleInfo.saleability === "NOT_FOR_SALE"
              ? "NOT FOR SALE"
              : "FREE"}
          </p>
          <div>
            {product.saleInfo.saleability === "NOT_FOR_SALE" ? null : (
              <div className="btn__cart">
                <ShoppingCartOutlinedIcon
                  onClick={handleAddToCart}
                  className="product__iconCart"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
