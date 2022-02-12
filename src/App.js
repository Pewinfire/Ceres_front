import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Landing from "./landing/Landing";
import MarketNear from "./market/pages/MarketNear";
import Markets from "./market/pages/Markets";
import NewMarket from "./market/pages/NewMarket";
import UpdateMarket from "./market/pages/UpdateMarket";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import NewShop from "./shop/pages/NewShop";
import Shops from "./shop/pages/Shops";
import UpdateShop from "./shop/pages/UpdateShop";
import Dashboard from "./user/pages/Dashboard";
import AdminDashboard from "./user/pages/AdminDashboard";
import SellerDashboard from "./user/pages/SellerDashboard";
import ShopPage from "./shop/pages/ShopPage";
import { AuthContext } from "./shared/context/auth-context";
import { CSSTransition } from "react-transition-group";

import { useAuth } from "./shared/hooks/auth-hook";

//import { TransitionGroup, CSSTransition } from "react-transition-group";

const Users = React.lazy(() => import("./user/pages/User"));
const Authenticate = React.lazy(() => import("./user/pages/Authenticate"));

const App = () => {
  const { token, login, logout, userId } = useAuth();
  const route = [
    { path: "/", Component: Landing },
    { path: "/shopPage/:shopId", Component: ShopPage },
    { path: "/markets", Component: Markets },
    { path: "/markets/near/:addr", Component: MarketNear },
    { path: "/:marketId/shops", Component: Shops },
    { path: "/seller/sllrDS", Component: SellerDashboard },
  ];
  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/markets/near/:addr" exact>
          <MarketNear />
        </Route>
        <Route path="/markets" exact>
          <Markets />
        </Route>
        <Route path="/:marketId/shops" exact>
          <Shops />
        </Route>
        <Route path="/shopPage/:shopId">
          <ShopPage />
        </Route>
        <Route path="/user/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/admin/admDS" exact>
          <AdminDashboard />
        </Route>
        <Route path="/seller/sllrDS" exact>
          <SellerDashboard />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Landing />
        </Route>
        <Route path="/:marketId/shops/" exact>
          <Shops />
        </Route>
        <Route path="/markets/near/:addr" exact>
          <MarketNear />
        </Route>
        <Route path="/markets" exact>
          <Markets />
        </Route>
        <Route path="/auth">
          <Authenticate />
        </Route>
        <Route path="/shopPage/:shopId">
          <ShopPage />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {" "}
            {route.map(({ path, Component }) => (
              <Route key={path} exact path={path}>
                {({ match }) => (
                  <CSSTransition
                    in={match != null}
                    timeout={900}
                    classNames="page"
                    unmountOnExit
                  >
                    <div className="page">
                      <Component />
                    </div>
                  </CSSTransition>
                )}
              </Route>
            ))}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
