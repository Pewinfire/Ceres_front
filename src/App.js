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
import Checkout from "./views/user/pages/Checkout";
import Authenticate from "./views/user/pages/Authenticate";
import MarketNear from "./views/market/pages/MarketNear";
import Markets from "./views/market/pages/Markets";
import Shops from "./views/shop/pages/Shops";
import ShopPage from "./views/shopView/pages/ShopPage";
import CheckOrder from "./views/user/pages/CheckOrder";

const Dashboard = React.lazy(()=> import("./views/dashboard/pages/Dashboard"));
const AdminDashboard = React.lazy(()=> import("./views/dashboard/pages/AdminDashboard"));
const SellerDashboard = React.lazy(()=> import("./views/dashboard/pages/SellerDashboard"));

const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="page" timeout={800}>
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
        <Route path="/user/checkout" exact>
          <Checkout />
        </Route>
        <Route path="/user/checkorder/:orderId" exact>
          <CheckOrder />
        </Route>
        <Route path="/:marketId/shops" exact>
          <Shops />
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
        <Route path="/user/checkorder" exact>
          <CheckOrder />
        </Route>
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
        <main className="mainApp">
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
