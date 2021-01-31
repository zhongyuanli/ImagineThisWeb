import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthenticateHomePage } from "./views/AuthenticateHomePage";
import OauthCallBackPage from "./views/OauthCallBackPage";
import { WireframesPage } from "./views/WireframesPage";
import { CommentsPage } from "./views/CommentsPage";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={AuthenticateHomePage} />
          <Route exact path="/auth" component={OauthCallBackPage} />
          <Route exact path="/wireframes" component={WireframesPage} />
          <Route exact path="/comments" component={CommentsPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
