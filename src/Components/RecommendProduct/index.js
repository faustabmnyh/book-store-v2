import { useEffect } from "react";
import "./RecommendProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProductsSearch } from "../../actions/productActions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";

const RecommendProduct = () => {
  const dispatch = useDispatch();
  const productSearchLists = useSelector((state) => state.productSearchLists);
  const { error, loading, products } = productSearchLists;
  useEffect(() => {
    dispatch(listProductsSearch("harry potter"));
  }, [dispatch]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="recommendProduct">
      <h2>Books may you have liked it</h2>
      <div className="recommendProduct__content">
        {products.map((product) => (
          <div className="recommendProduct__container">
            <Link to={`/product/${product.id}`}>
              <img
                src={product.volumeInfo.imageLinks?.thumbnail}
                alt={product.volumeInfo.title}
                className="recommendProduct__image"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendProduct;
