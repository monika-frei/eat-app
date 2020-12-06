import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import { AnimatePresence } from "framer-motion";
import { routes } from "./routes";
import AuthPage from "./views/AuthPage/AuthPage";
import WelcomePage from "./views/WelcomePage/WelcomePage";
import PlanPage from "./views/PlanPage/PlanPage";
import RecipesPage from "./views/RecipesPage/RecipesPage";
import GroceryListPage from "./views/GroceryListPage/GroceryListPage";
import DetailsPage from "./views/DetailsPage/DetailsPage";
import GlobalContextProvider from "./context/GlobalContext";
import PlanContextProvider from "./context/PlanContext";
import RecipesContextProvider from "./context/RecipesContext";
import DetailedDayPlan from "./views/DetailedDayPlan/DetailedDayPlan";

function App() {
  return (
    <Provider store={store}>
      <GlobalContextProvider>
        <Router>
          <Route
            render={({ location }) => (
              // <AnimatePresence initial={false} exitBeforeEnter>
              <Switch location={location} key={location.key}>
                <Route exact path={routes.home} component={WelcomePage} />
                <Route path={routes.signup} component={AuthPage} />
                <Route exact path={routes.login} component={AuthPage} />
                <Route exact path={routes.plan}>
                  <PlanContextProvider>
                    <PlanPage />
                  </PlanContextProvider>
                </Route>
                <Route exact path={routes.dayPlan}>
                  <PlanContextProvider>
                    <DetailedDayPlan />
                  </PlanContextProvider>
                </Route>
                <Route exact path={routes.recipes}>
                  <RecipesContextProvider>
                    <RecipesPage />
                  </RecipesContextProvider>
                </Route>
                <Route exact path={routes.recipe}>
                  <RecipesContextProvider>
                    <DetailsPage />
                  </RecipesContextProvider>
                </Route>
                <Route exact path={routes.list}>
                  <RecipesContextProvider>
                    <GroceryListPage />
                  </RecipesContextProvider>
                </Route>
              </Switch>
              // </AnimatePresence>
            )}
          />
        </Router>
      </GlobalContextProvider>
    </Provider>
  );
}

export default App;
