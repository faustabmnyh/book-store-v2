import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import DetailProduct from "./pages/DetailProducts";
import Cart from "./pages/Cart";

function App() {
  return (
    <div className="App">
      <div className="home grid__container">
        <Router>
          <Header />
          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={DetailProduct} />
            <Route exact path="/cart/:id?" component={Cart} />
          </main>
        </Router>
        <Footer />
      </div>
    </div>
  );
}

export default App;
