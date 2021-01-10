import React from "react";
import { Route } from "react-router-dom";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Cart from "../Cart";
import Home from "../Home";
import DetailProduct from "../DetailProducts";
import Shipping from "../Shipping";
import Payment from "../Payment";
import Order from "../Order";
import OrderHistory from "../OrderHistory";
import SearchPage from "../SearchPage";
import CategoryPage from "../CategoryPage";

const MainApp = () => {
  return (
    <div className="home grid__container">
      <Header />
      <main>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={DetailProduct} />
        <Route exact path="/cart/:id?" component={Cart} />
        <Route exact path="/shipping" component={Shipping} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/order/:id" component={Order} />
        <Route exact path="/orderhistory" component={OrderHistory} />
        <Route exact path="/search/:titlebook" component={SearchPage} />
        <Route exact path="/category/:category" component={CategoryPage} />
      </main>
      <Footer />
    </div>
  );
};

export default MainApp;
