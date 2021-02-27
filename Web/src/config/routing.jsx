import React from "react";
import {
  HashRouter,
  Redirect,
  Route,
} from "react-router-dom";


import Signin from "../containers/signin"
import Signup from "../containers/signup"
import VendorDashboard from "../containers/vendordashboard";
import UserDashboard from "../containers/userdashboard";
import MyRequests from "../containers/myrequests";
import ForgetPassword from '../containers/forget-password';


// Improrting Global context
import { useGlobalState } from '../context/index';




export default function AppRouter() {

  const globalState = useGlobalState();

  return (
    <HashRouter>
      {(globalState.loginStatus === false) ?
        <>
          <Route exact={true} path="/">
            <Signin />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/forget-password">
            <ForgetPassword />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </>
        : null}
      {/* private routes */}

      {(globalState.role === "user" && globalState.loginStatus === true) ?
        <>
          <Route exact path="/">
            <UserDashboard />
          </Route>
          <Route exact path="/my-requests">
            <MyRequests />
          </Route>
          <Route exact path="/forget-password">
            <ForgetPassword />
          </Route>
          
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </>
        : null}
      {(globalState.role === "admin" && globalState.loginStatus === true) ?

        <>
          <Route exact path="/">
            <VendorDashboard />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </>
        : null}
    </HashRouter >

  )
}