import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import WelcomePage from "./views/WelcomePage/WelcomePage";
import { routes } from "./routes";
import SignUpPage from "./views/SignUpPage/SignUpPage";
import PlanPage from "./views/PlanPage/PlanPage";
import { AnimatePresence } from "framer-motion";
import RecepiesPage from "./views/RecepiesPage/RecepiesPage";
import ShoppingListPage from "./views/ShoppingListPage/ShoppingListPage";
function App() {
  return (
    <Router>
      <Route
        render={({ location }) => (
          <AnimatePresence initial={false} exitBeforeEnter>
            <Switch location={location} key={location.key}>
              <Route exact path={routes.home} component={WelcomePage} />
              <Route path={routes.signup} component={SignUpPage} />
              <Route path={routes.login} component={SignUpPage} />
              <Route path={routes.plan} component={PlanPage} />
              <Route path={routes.recepies} component={RecepiesPage} />
              <Route path={routes.list} component={ShoppingListPage} />
            </Switch>
          </AnimatePresence>
        )}
      />
    </Router>
  );
}

export default App;
