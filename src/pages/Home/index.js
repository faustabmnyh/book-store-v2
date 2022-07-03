import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";
import LoadingBox from "../../Components/LoadingBox";
import MessageBox from "../../Components/MessageBox";
import Product from "../../Components/Product";
import "./Home.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { useHistory } from "react-router-dom";
SwiperCore.use([Pagination, Autoplay]);

const Home = () => {
  const productLists = useSelector((state) => state.productLists);
  const { loading, error, products } = productLists;
  const dispatch = useDispatch();
  const history = useHistory()
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
        <div className="home container">
          <div>
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{ delay: 5000 }}
              loop={true}
              pagination={{ clickable: true }}
            >
              <SwiperSlide>
                <div className="home__bg">
                  <img
                    src="/images/pictures/banner.png"
                    alt="bubble"
                    className="home__imgMain"
                  />
                  <div className="home__bannerContent">
                    <img
                      src="/images/pictures/bannerbook.png"
                      alt="bubble"
                      className="home__imgContent"
                    />
                    <div>
                      <p>
                        Check out some of the latest Naruto comics collections
                        only at Mr. Book
                      </p>
                      <button
                        onClick={() => history.push(`/search/naruto`)}
                      >
                        Check Comics Now
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="/images/pictures/banner2.png"
                  alt=""
                  className="home__bg"
                />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="home__product">
            {products?.map(
              (product) =>
                product.saleInfo.saleability !== "NOT_FOR_SALE" && (
                  <Product key={product.id} product={product} />
                )
            )}
          </div>
        </div>
      )}
      {/* <RecommendProduct /> */}
    </>
  );
};

export default Home;
