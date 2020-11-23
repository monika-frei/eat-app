import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import { AnimatePresence } from "framer-motion";
import { routes } from "./routes";
import SignUpPage from "./views/SignUpPage/SignUpPage";
import WelcomePage from "./views/WelcomePage/WelcomePage";
import PlanPage from "./views/PlanPage/PlanPage";
import RecepiesPage from "./views/RecepiesPage/RecepiesPage";
import GroceryListPage from "./views/GroceryListPage/GroceryListPage";
import DetailsPage from "./views/DetailsPage/DetailsPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route
          render={({ location }) => (
            <AnimatePresence initial={false} exitBeforeEnter>
              <Switch location={location} key={location.key}>
                <Route exact path={routes.home} component={WelcomePage} />
                <Route path={routes.signup} component={SignUpPage} />
                <Route path={routes.login} component={SignUpPage} />
                <Route path={routes.plan} component={PlanPage} />
                <Route exact path={routes.recepies} component={RecepiesPage} />
                <Route path={routes.recepie} component={DetailsPage} />
                <Route path={routes.list} component={GroceryListPage} />
              </Switch>
            </AnimatePresence>
          )}
        />
      </Router>
    </Provider>
  );
}

export default App;
