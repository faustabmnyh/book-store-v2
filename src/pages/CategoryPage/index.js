import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../../actions/cartActions";
import { listCategoryProduct } from "../../actions/productActions";
import { currency } from "../../Components/Currency";
import LoadingBox from "../../Components/LoadingBox";
import MessageBox from "../../Components/MessageBox";
import "./CategoryPage.css";

const CategoryPage = () => {
  let { category } = useParams();
  const dispatch = useDispatch();
  const productCategory = useSelector((state) => state.productCategory);
  const { loading, error, products } = productCategory;
  useEffect(() => {
    dispatch(listCategoryProduct(category));
  }, [dispatch, category]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="categoryPage">
      <h1 className>{category}</h1>
      <div className="categoryPage__content">
        {products.map((product) => (
          <div
            className={
              category === "books"
                ? "categoryPage__container"
                : "categoryPage__container magazines"
            }
          >
            <div>
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.volumeInfo.imageLinks?.thumbnail}
                  alt={product.volumeInfo.title}
                  className="categoryPage__image"
                />
              </Link>
              <Link to={`/product/${product.id}`}>
                <h2>{product.volumeInfo.title}</h2>
              </Link>
              <div className="categoryPage__authors">
                {product.volumeInfo?.authors ? (
                  product.volumeInfo.authors?.map((author) => (
                    <div key={author}>{author}</div>
                  ))
                ) : (
                  <div>Unknown</div>
                )}
              </div>
            </div>
            <div className="categoryPage__btnContainer">
              <strong>
                {product.saleInfo.listPrice?.amount
                  ? `IDR ${currency(product.saleInfo.listPrice?.amount)}`
                  : product.saleInfo.saleability === "NOT_FOR_SALE"
                  ? "NOT FOR SALE"
                  : "FREE"}
              </strong>
              <div>
                {product.saleInfo.saleability === "NOT_FOR_SALE" ? null : (
                  <button
                    onClick={() => dispatch(addToCart(product, 1))}
                    className="categoryPage__btn"
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
