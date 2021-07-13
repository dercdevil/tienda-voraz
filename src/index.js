import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
// import Components from "views/Components/Components.js";
// import LandingPage from "views/LandingPage/LandingPage.js";
import Register from "views/LoginPage/Register.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import ResetPassword from "views/LoginPage/ResetPassword.js";
import PageNotFound from "views/LoginPage/pageNotFound.js";
import Home from "views/Home/Home.js";
import PrivateRoute from "auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {subscription} from "main";
var hist = createBrowserHistory();
const queryClient = new QueryClient();
subscription();
ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <Router history={hist}>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/resetPassword" component={ResetPassword} />
        <PrivateRoute path="/home" component={Home} />
        <Route path="/Register" component={Register} />
        <Route path="*" component={PageNotFound} />
      </Switch>
      <ToastContainer />
    </Router>
  </QueryClientProvider>,
  document.getElementById("root")
);

