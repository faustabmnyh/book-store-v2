import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { addToCart } from "../../actions/cartActions";
import { listProductsSearch } from "../../actions/productActions";
import { currency } from "../../Components/Currency";
import LoadingBox from "../../Components/LoadingBox";
import MessageBox from "../../Components/MessageBox";
import "./SearchPage.css";
const SearchPage = () => {
  let { titlebook } = useParams();
  const history = useHistory();
  const productSearchLists = useSelector((state) => state.productSearchLists);
  const { error, loading, products } = productSearchLists;
  const dispatch = useDispatch();
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  function getNameAuthor(authors) {
    const getEachAuthor = [];
    authors.map((author) => getEachAuthor.push(author));
    return getEachAuthor.join(", ");
  }

  useEffect(() => {
    dispatch(listProductsSearch(titlebook));
  }, [dispatch, titlebook]);
  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="searchPage">
      <h2>Search Result : {titlebook}</h2>
      {products.map((product) => (
        <div key={product.id} className="searchPage__container">
          <img
            src={product.volumeInfo.imageLinks?.thumbnail}
            alt="books"
            className="searchPage__image"
            onClick={() => history.push(`/product/${product.id}`)}
          />

          <div className="searchPage__body">
            <div className="searchPage__bodyHeader">
              <Link to={`/product/${product.id}`}>
                <h2>{product.volumeInfo.title}</h2>
              </Link>
              <div className="searchPage__authors">
                {product.volumeInfo.authors ? (
                  getNameAuthor(product.volumeInfo.authors)
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
              {product.saleInfo.saleability === "NOT_FOR_SALE" ? null : (
                <button onClick={() => dispatch(addToCart(product, 1))}>
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
