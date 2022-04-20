import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  withRouter,
} from "react-router-dom";
import Landing from "./views/landing/Landing";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Authenticate = React.lazy(() => import("./views/user/pages/Authenticate"));
const MarketNear = React.lazy(() => import("./views/market/pages/MarketNear"));
const Markets = React.lazy(() => import("./views/market/pages/Markets"));
const Shops = React.lazy(() => import("./views/shop/pages/Shops"));
const Dashboard = React.lazy(() => import("./views/user/pages/Dashboard"));
const AdminDashboard = React.lazy(() => import("./views/user/pages/AdminDashboard"));
const SellerDashboard = React.lazy(() =>
  import("./views/user/pages/SellerDashboard")
);
const ShopPage = React.lazy(() => import("./views/shopView/pages/ShopPage"));

const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="page" timeout={600}>
      <Switch location={location}>
        <Route path="/" exact>
          <Landing />
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
    </CSSTransition>
  </TransitionGroup>
));
const AnimatedSwitchNT = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="page" timeout={600}>
      <Switch location={location}>
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
    </CSSTransition>
  </TransitionGroup>
));
const App = () => {
  const { token, login, logout, userId } = useAuth();

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
            {(!token && <AnimatedSwitchNT />) || <AnimatedSwitch />}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
