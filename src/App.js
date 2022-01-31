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
import UpdateUser from "./user/pages/UpdateUser";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

//import { TransitionGroup, CSSTransition } from "react-transition-group";

const Users = React.lazy(() => import("./user/pages/User"));
const Authenticate = React.lazy(() => import("./user/pages/Authenticate"));

const App = () => {
  const { token, login, logout, userId } = useAuth();
  
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
        <Route path="/:userId/user/update" exact>
          <UpdateUser />
        </Route>
        <Route path="/user/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/markets/near/:addr" exact>
          <MarketNear />
        </Route>
        <Route path="/markets/new" exact>
          <NewMarket />
        </Route>
        <Route path="/markets" exact>
          <Markets />
        </Route>
        <Route path="/:marketId/market/edit" exact>
          <UpdateMarket />
        </Route>
        <Route path="/:marketId/shops" exact>
          <Shops />
        </Route>
        <Route path="/:shopId/shop/edit" exact>
          <UpdateShop />
        </Route>
        <Route path="/shops/new" exact>
          <NewShop />
        </Route>
        <Route path="/user/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/admin/admDS" exact>
          <AdminDashboard />
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
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
