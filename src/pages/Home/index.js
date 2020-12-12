import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import LoadingBox from "../../Components/LoadingBox";
import MessageBox from "../../Components/MessageBox";
import Product from "../../Components/Product";
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
        <div className="home__product">
          {products?.map((product) => (
            <Product
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
