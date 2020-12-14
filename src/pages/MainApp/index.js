import React from "react";
import { Route } from "react-router-dom";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header";
import Cart from "../Cart";
import Home from "../Home";
import DetailProduct from "../DetailProducts";
import Shipping from "../Shipping";
import Payment from "../Payment";

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
      </main>
      <Footer />
    </div>
  );
};

export default MainApp;
