import React from "react";
import { Route, Switch, } from "react-router-dom";
import Home from "./home";
import Signup from "./user/signup";
import Signin from "./user/Signin";
import Navbar from "./components/Navbarnew";
import Profile from "./user/User";
import UserList from "./user/UserList"
import EditProfile from "./user/EditProfile"
import PrivateRoute from "../auth/PrivateRoute"
import FindUser from "./user/FindUsers"
import CreatePost from "../posts/CreatePost"
import SinglePost from "../posts/singlePost"
import EditPost from "../posts/EditPost"
import "./user/home.css"
const Mainnavigator = () => (
  <>
     <Navbar/> 
     <main className="background-container">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/post/:postId" component={SinglePost} />
      <Route exact path ="/signin" component={Signin}/>
      <Route exact path ="/signup" component ={Signup}/>
      <PrivateRoute exact path="/post/edit/:postId" component={EditPost}/>
      <Route path ="/users" exact component={UserList}/>
      <PrivateRoute path="/createpost" exact component={CreatePost}/>
      <PrivateRoute exact path ="/findPeople" component={FindUser}/>   
      <PrivateRoute exact path ="/user/:userId" component={Profile}/>
      <PrivateRoute exact path ="/user/update/:userId" component={EditProfile} />

      </Switch>
      </main>
    </>
);

export default Mainnavigator;
