import { Route, Switch, Redirect, HashRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LaunchPage from "./Pages/LaunchPage";
import NotFoundPage from "./Pages/NotFoundPage";

function App() {
  return (
    <div>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/launch/:id" component={LaunchPage} />
          <Route exact path="/404" component={NotFoundPage} />
              <Redirect to="/404" />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
