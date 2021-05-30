import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listCategoryProduct } from "../../actions/productActions";
import LoadingBox from "../../Components/LoadingBox";
import MessageBox from "../../Components/MessageBox";
import Product from "../../Components/Product";
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
      <div className="categoryPage__content container">
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};


export default CategoryPage;
