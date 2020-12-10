import { Link } from "react-router-dom";
import "./Product.css";
import AddIcon from "@material-ui/icons/Add";

const Product = ({ title, authors, price, image }) => {
  return (
    <div className="product">
      <div className="product__content">
        <Link>
          <img className="product__image medium" src={image} alt="books" />
        </Link>
        <div className="product__text">
          <div>
            <Link to="product/1">
              <h2 className="product__title">{title}</h2>
            </Link>
            {authors !== "DONT KNOW" ? (
              authors?.map((author) => (
                <div className="product__author">{author}</div>
              ))
            ) : (
              <div className="product__author">DONT KNOW</div>
            )}
          </div>
          <div className="product__prices">
            <p className="product__price price">
              {price ? `IDR ${price}` : "FREE"}
            </p>{" "}
            <div className="btn__cart">
              <AddIcon style={{ color: "white" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
