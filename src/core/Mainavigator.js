import React from "react";
import { Route, Switch, } from "react-router-dom";
import Home from "./home";
import Signup from "./user/signup"
import Signin from "./user/Signin";
import Navbar from "./components/navbar";
import Profile from "./user/User";
const Mainnavigator = () => (
  <>
     <Navbar/> 
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path ="/signin" component={Signin}/>
      <Route path ="/signup" component ={Signup}/>   
      <Route path ="/user/:userId" component={Profile}/> 
      </Switch>
    </>
);

export default Mainnavigator;
