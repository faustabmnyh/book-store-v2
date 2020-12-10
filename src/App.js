import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import DetailProduct from "./pages/DetailProducts";

function App() {
  return (
    <div className="App">
      <div className="home grid__container">
        <Router>
          <Header />
          <main>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/product/:id" component={DetailProduct}></Route>
          </main>
        </Router>
        <Footer />
      </div>
    </div>
  );
}

export default App;
