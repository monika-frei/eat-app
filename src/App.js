import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WelcomePage from "./views/WelcomePage/WelcomePage";
import { routes } from "./routes";
import SignUpPage from "./views/SignUpPage/SignUpPage";
import { AnimatePresence } from "framer-motion";
function App() {
  return (
    <Router>
      <Route
        render={({ location }) => (
          <AnimatePresence initial={false} exitBeforeEnter>
            <Switch location={location} key={location.key}>
              <Route exact path={routes.home} component={WelcomePage} />
              <Route path={routes.signup} component={SignUpPage} />
            </Switch>
          </AnimatePresence>
        )}
      />
    </Router>
  );
}

export default App;
