import React from "react";
import { Route, Switch, } from "react-router-dom";
import Home from "./home";
import Signup from "./user/signup"
import Signin from "./user/Signin";
import Navbar from "./components/navbar";
import Profile from "./user/User";
import UserList from "./user/UserList"
import EditProfile from "./user/EditProfile"
const Mainnavigator = () => (
  <>
     <Navbar/> 
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path ="/signin" component={Signin}/>
      <Route path ="/signup" component ={Signup}/>
      <Route path ="/users" exact component={UserList}/>   
      <Route exact path ="/user/:userId" component={Profile}/>
      <Route exact path ="/user/update/:userId" component={EditProfile} /> 
      </Switch>
    </>
);

export default Mainnavigator;
