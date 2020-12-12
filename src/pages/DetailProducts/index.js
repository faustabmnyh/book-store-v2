import { useEffect } from "react";
import "./DetailProducts.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailsProduct } from "../../actions/productActions";
import LoadingBox from "../../Components/LoadingBox";
import MessageBox from "../../Components/MessageBox";
import Checkout from "../../Components/Checkout";

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
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="detailProducts__content">
          <div className="col-1">
            <img
              alt={product.volumeInfo?.title}
              src={product.volumeInfo.imageLinks.thumbnail}
              className="detailProducts__image"
            />
          </div>
          <div className="detailProducts__description col-3">
            <h1>{product.volumeInfo?.title}</h1>
            {product.volumeInfo?.authors ? (
              product.volumeInfo?.authors?.map((author) => (
                <div key={author}>
                  <a href="!#">{author}</a> (author)
                </div>
              ))
            ) : (
              <div>DONT KNOW</div>
            )}
            <hr />
            <div>
              <h2>Description :</h2>
              <p
                dangerouslySetInnerHTML={createMarkUp(
                  product.volumeInfo?.description
                )}
              ></p>
            </div>
          </div>
          <div className="col-2">
            <Checkout product={product} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProduct;
