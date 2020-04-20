import React, { Component } from "react";
import { Route, Switch,Router } from "react-router-dom";
import Home from "./home";
import Signup from "./user/signup"
import Signin from "./user/Signin";
import Navbar from "./components/navbar";

const Mainnavigator = () => (
  <>
     <Navbar/> 
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path ="/signin" component={Signin}/>
      <Route path ="/signup" component ={Signup}/>    
      </Switch>
    </>
);

export default Mainnavigator;
