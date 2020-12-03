import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/index";
import { AnimatePresence } from "framer-motion";
import { routes } from "./routes";
import AuthPage from "./views/AuthPage/AuthPage";
import WelcomePage from "./views/WelcomePage/WelcomePage";
import PlanPage from "./views/PlanPage/PlanPage";
import RecepiesPage from "./views/RecepiesPage/RecepiesPage";
import GroceryListPage from "./views/GroceryListPage/GroceryListPage";
import DetailsPage from "./views/DetailsPage/DetailsPage";
import GlobalContextProvider from "./context/GlobalContext";
import PlanContextProvider from "./context/PlanContext";
import RecepiesContextProvider from "./context/RecepiesContext";
import DetailedDayPlan from "./views/DetailedDayPlan/DetailedDayPlan";

function App() {
  return (
    <Provider store={store}>
      <GlobalContextProvider>
        <Router>
          <Route
            render={({ location }) => (
              <AnimatePresence initial={false} exitBeforeEnter>
                <Switch location={location} key={location.key}>
                  <Route exact path={routes.home} component={WelcomePage} />
                  <Route path={routes.signup} component={AuthPage} />
                  <Route path={routes.login} component={AuthPage} />
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
                  <Route exact path={routes.recepies}>
                    <RecepiesContextProvider>
                      <RecepiesPage />
                    </RecepiesContextProvider>
                  </Route>
                  <Route exact path={routes.recepie}>
                    <RecepiesContextProvider>
                      <DetailsPage />
                    </RecepiesContextProvider>
                  </Route>
                  <Route exact path={routes.list}>
                    <RecepiesContextProvider>
                      <GroceryListPage />
                    </RecepiesContextProvider>
                  </Route>
                </Switch>
              </AnimatePresence>
            )}
          />
        </Router>
      </GlobalContextProvider>
    </Provider>
  );
}

export default App;
