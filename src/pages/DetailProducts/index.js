import { useEffect } from "react";
import "./DetailProducts.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailsProduct } from "../../actions/productActions";
import LoadingBox from "../../Components/LoadingBox";
import MessageBox from "../../Components/MessageBox";
import Checkout from "../../Components/Checkout";
import BookInformations from "../../Components/BookInformations";

const DetailProduct = () => {
  let { id } = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const dispatch = useDispatch();
  function createMarkUp(e) {
    return { __html: e };
  }
  useEffect(() => {
    dispatch(detailsProduct(id));
  }, [dispatch, id]);
  return (
    <div className="detailProduct container">
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="detailProducts__content">
          <div className="detailProducts__left detailProducts__container">
            <h1>{product.volumeInfo?.title}</h1>
            <div className="detailProduct__bookInfo">
              <img
                alt={product.volumeInfo?.title}
                src={product.volumeInfo.imageLinks.thumbnail}
                className="detailProducts__image"
              />
              <div>
                <BookInformations product={product} />
              </div>
            </div>
            <div className="detailProducts__description">
              <h2>Description :</h2>
              <p
                dangerouslySetInnerHTML={createMarkUp(
                  product.volumeInfo?.description
                )}
              ></p>
            </div>
          </div>
          <div className="detailProducts__right detailProducts__container">
            <Checkout product={product} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProduct;
