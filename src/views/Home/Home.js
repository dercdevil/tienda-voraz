import React, { lazy, Suspense } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import Logout from "Logout";
import Loader from "components/Loader/Loader"
// const Sidebar = lazy(() => import("components/Sidebar/Sidebar.js"));
const Carriers = lazy(() => import("views/Home/Carriers"));
const ProfilePage = lazy(() => import("views/ProfilePage/ProfilePage"));
const Profiles = lazy(() => import("views/Home/Profiles"));
const Product = lazy(() => import("views/Home/Product"));
const Orders = lazy(() => import("views/Home/Orders"));
const Record = lazy(() => import("views/Home/Record"));
const Invoice = lazy(() => import("views/Home/Invoice"));

var hist = createBrowserHistory();

export default function Home(props) {
  return (
    <Router history={hist}>
      <Suspense
        fallback={<Loader size={50}/>}
      >
          <Switch>
            <Route exact path={"/home/ProfilePage"} component={ProfilePage}/>
            <Route exact path={"/home/Orders/invoice"} component={Invoice} />
            <Route exact path={"/home/Profiles"} component={Profiles} />
            <Route exact path={"/home/Carriers"} component={Carriers} />
            <Route exact path={"/home/Product"} component = {Product}/>
            <Route exact path={"/home/Orders"} component={Orders} />
            <Route exact path={"/home/Record"} component={Record} />
            <Route exact path="/logout" component={Logout} />
          </Switch>
      </Suspense>
    </Router>
  );
}
