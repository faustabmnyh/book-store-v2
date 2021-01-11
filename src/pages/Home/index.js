import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import LoadingBox from "../../Components/LoadingBox";
import MessageBox from "../../Components/MessageBox";
import Product from "../../Components/Product";
import RecommendProduct from "../../Components/RecommendProduct";
import "./Home.css";

const Home = () => {
  const productLists = useSelector((state) => state.productLists);
  const { loading, error, products } = productLists;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <img
            src="/images/background/back.png"
            alt="bubble"
            className="home__back"
          />
          <div className="home__product">
            {products?.map((product) =>
              product.saleInfo.saleability === "NOT_FOR_SALE" ? null : (
                <Product key={product.id} product={product} />
              )
            )}
          </div>
        </>
      )}
      {/* <RecommendProduct /> */}
    </>
  );
};

export default Home;
