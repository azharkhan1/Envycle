import React from "react";
import {
  HashRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";


import Signin from "../containers/signin"
import Signup from "../containers/signup"
import VendorDashboard from "../containers/vendordashboard";
import UserDashboard from "../containers/userdashboard";
import MyRequests from "../containers/myrequests";
import ForgetPassword from '../containers/forget-password';
import RedeemVoucher from '../containers/redeem-voucher';
import AddRestaurant from '../containers/vendor-restaurants';

// Improrting Global context
import { useGlobalState } from '../context/index';
import AddProduct from "../containers/add-product";




export default function AppRouter() {

  const globalState = useGlobalState();

  return (
    <HashRouter>
      {(globalState.loginStatus === false) ?
        <>
          <Switch>
            <Route exact={true} path="/">
              <Signin />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/forget-password">
              <ForgetPassword />
            </Route>
          </Switch>
        </>
        : null}
      {/* private routes */}

      {(globalState.role === "user" && globalState.loginStatus === true) ?
        <>
          <Switch>
            <Route exact path="/">
              <UserDashboard />
            </Route>
            <Route exact path="/my-requests">
              <MyRequests />
            </Route>
            <Route exact path="/redeem-voucher">
              <RedeemVoucher />
            </Route>
            <Route path='*'>
              <UserDashboard />
            </Route>
          </Switch>
        </>
        : null}
      {(globalState.role === "admin" && globalState.loginStatus === true) ?

        <>
          <Switch>
            <Route exact path="/">
              <VendorDashboard />
            </Route>
            <Route path="/add-restaurant">
              <AddRestaurant />
            </Route>
            <Route path="/add-product">
              <AddProduct />
            </Route>

          </Switch>
        </>
        : null}
    </HashRouter >

  )
}