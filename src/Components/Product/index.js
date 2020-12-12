import { Link } from "react-router-dom";
import "./Product.css";
import AddIcon from "@material-ui/icons/Add";
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
        <Link to={`product/${product.id}`}>
          <img
            className="product__image medium"
            src={product.volumeInfo.imageLinks.thumbnail}
            alt="books"
          />
        </Link>
        <div className="product__text">
          <div>
            <Link to={`product/${product.id}`}>
              <h2 className="product__title">{product.volumeInfo.title}</h2>
            </Link>
            {product.volumeInfo.authors ? (
              product.volumeInfo.authors?.map((author) => (
                <div key={author} className="product__author">
                  {author}
                </div>
              ))
            ) : (
              <div className="product__author">DONT KNOW</div>
            )}
          </div>
          <div className="product__prices">
            <p className="product__price price">
              {product.saleInfo.listPrice?.amount
                ? `IDR ${currency(product.saleInfo.listPrice?.amount)}`
                : "FREE"}
            </p>{" "}
            <div className="btn__cart">
              <AddIcon style={{ color: "white" }} onClick={handleAddToCart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
