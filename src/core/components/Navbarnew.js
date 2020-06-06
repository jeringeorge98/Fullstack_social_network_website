import React from "react";
import './index.css'
import {NavLink,withRouter} from'react-router-dom';

const isAuthenticate=()=>{
    if(typeof window === undefined){
      return false
    }

   if(localStorage.getItem("jwt"))
   return  JSON.parse(localStorage.getItem("user"))
   else 
   return false

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

const Navbar=({history})=>{
    return(
    <header className="toolbar">
    <nav className="toolbar_navigation">
    <div/>
    <div className="toolbar_navigation-items">
    <ul>
    <li>
   <NavLink exact to="/" style={{textDecoration:"none",color:"white"}} activeStyle={{textDecoration:"none",color:"lightgreen"}} >Home</NavLink> 
    </li>
    <li>
    <NavLink exact to="/users" style={{textDecoration:"none",color:"white"}} activeStyle={{textDecoration:"none",color:"lightgreen"}}>Users</NavLink>
    </li>
    <li>
   <NavLink exact to="/findPeople" style={{textDecoration:"none",color:"white"}} activeStyle={{textDecoration:"none",color:"lightgreen"}} >Find Users</NavLink> 
    </li>
    {isAuthenticate()?(
        <>
        <li>
   <NavLink exact to={`/user/${isAuthenticate()._id}`} style={{textDecoration:"none",color:"white"}} activeStyle={{textDecoration:"none",color:"lightgreen"}} >{`${isAuthenticate().Username}'s Profile`}</NavLink> 
   
   </li>
   <li>
        <NavLink  style={{cursor:"pointer"}}   style={{textDecoration:"none",color:"white"}} activeStyle={{textDecoration:"none",color:"lightgreen"}} exact to ="/createPost">
            Create Post
          </NavLink>
        </li>
        <li>
        <a  style={{cursor:"pointer",color:"white"}} onClick={()=>signout(()=>history.push("/"))}>
            Sign Out
          </a>
        </li>
        </>
    ):(
        <>
        <li>
        <NavLink  to="/signup" style={{textDecoration:"none",color:"white"}} activeStyle={{textDecoration:"none",color:"lightgreen"}}>
            Sign Up
          </NavLink>
        </li>
        <li>
      <NavLink style={{textDecoration:"none",color:"white"}} activeStyle={{textDecoration:"none",color:"lightgreen"}}  exact to="/signin">
          Sign In
        </NavLink>
        </li>
        </>
    )}
    </ul>
    </div>
    </nav>
    
    </header>
            
    )
}
export default withRouter(Navbar)