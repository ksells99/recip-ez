import React, { useEffect, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import BrowseRecipes from "./components/recipes/BrowseRecipes";
import SavedRecipes from "./components/recipes/SavedRecipes";
import Recipe from "./components/recipes/Recipe";
import PrivateRoute from "./components/routing/PrivateRoute";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";

// Check localstorage for token - if there is, pass into setAuthToken function (setAuthToken.js file)
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/find' component={BrowseRecipes} />
            <PrivateRoute exact path='/saved' component={SavedRecipes} />
            <Route exact path='/recipe/:id' component={Recipe} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
