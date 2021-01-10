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
  return (
    <div className="product">
      <div className="product__content">
        <Link to={`/product/${product.id}`}>
          <img
            className="product__image medium"
            src={product.volumeInfo.imageLinks.thumbnail}
            alt="books"
          />
        </Link>
        <div className="product__text">
          <div>
            <Link to={`/product/${product.id}`}>
              <h2 className="product__title">{product.volumeInfo.title}</h2>
            </Link>
            {product.volumeInfo.authors ? (
              product.volumeInfo.authors?.map((author) => (
                <div key={author} className="product__author">
                  {author},
                </div>
              ))
            ) : (
              <div className="product__author">Unknown</div>
            )}
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
                    style={{ color: "white" }}
                    fontSize="small"
                    onClick={handleAddToCart}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
