import React, { Component } from "react";
import {Link,withRouter} from 'react-router-dom';


const isActive=(history,path)=>{
if(history.location.pathname===path) return "nav-link active"
else
return "nav-link"
}
   const signout=(next)=>{
     if(typeof window!== undefined)
     {
         localStorage.removeItem("jwt");
         localStorage.removeItem("user");
     }
         next();
         return fetch("http://localhost:5000/signOut",{
             method:'GET',
         }).then(resp=>{
             console.log(resp.json)
         })
         .catch(err=>console.log(err))
   }

const Navbar = ({history}) => {
  return (
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <Link class={isActive(history,"/")} to="/">
            Home Page
          </Link>
        </li>
        <li class="nav-item">
        <Link class={isActive(history,"/signup")} to="/signup">
            Sign Up
          </Link>
        </li>
        <li class="nav-item">
        <Link class={isActive(history,"/signin")} to="/signin">
            Sign In
          </Link>
        </li>
        <li class="nav-item">
        <a class="nav-link" style={{cursor:"pointer"}} onClick={()=>signout(()=>history.push('/'))}>
            Sign Out
          </a>
        </li>
        </ul>
  );
};
export default withRouter(Navbar)