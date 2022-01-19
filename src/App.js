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

/* import Users from "./user/pages/User";
import NewPlace from "./places/pages/NewPlaces";

import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Authenticate from "./user/pages/Authenticate"; */
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

const Users = React.lazy(() => import("./user/pages/User"));
/* const NewPlace = React.lazy(() => import("./places/pages/NewPlaces"));
const UserPlaces = React.lazy(() => import("./places/pages/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/pages/UpdatePlace")); */
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
        <Route path="/markets/near/:addr" exact>
          <MarketNear />
        </Route>
        <Route path="/markets" exact>
          <Markets />
        </Route>
       
        {/*  <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route> */}
        <Redirect to="/" />
      </Switch>
    );
  } else {
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
      
        {/* <Route path="/:userId/places" exact>
          <UserPlaces />
        </Route> */}
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