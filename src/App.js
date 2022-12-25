import logo from "./logo.svg";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Game from "./Components/Game";
import Menu from "./Components/Menu";
import Create from "./Components/Create";
import Select from "./Components/Select";
import Edit from "./Components/Edit";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
        <Route path="/edit/:id" component={Edit} />
          <Route path="/create" component={Create} />
          <Route path="/game/:id" component={Game} />
          <Route path="/select" component={Select} />
          <Route exact path="/" component={Menu} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
