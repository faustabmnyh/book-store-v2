import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from "./pages/Signin";
import MainApp from "./pages/MainApp";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/signin" component={Signin} />
          <Route path="/">
            <MainApp />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
