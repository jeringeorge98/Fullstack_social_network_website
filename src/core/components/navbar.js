import React from "react";
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

   const isAuthenticate=()=>{
     if(typeof window === undefined){
       return false
     }

    if(localStorage.getItem("jwt"))
    return  JSON.parse(localStorage.getItem("user"))
    else 
    return false

   }
const Navbar = ({history}) => {
  return (
      <ul className="nav nav-tabs" style={{}}>
        <li className="nav-item">
          <Link className={isActive(history,"/")} to="/">
            Home Page
          </Link>
        </li>
        <li className="nav-item">
          <Link className={isActive(history,"/users")} to="/users">
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link className={isActive(history,"/findPeople")} to="/findPeople">
           Find  Users
          </Link>
        </li>
        {isAuthenticate()?(
          <>
        <li className="nav-item">
        <Link className="nav-link" style={{cursor:"pointer"}} to={`/user/${isAuthenticate()._id}`}>
            {`${isAuthenticate().Username}'s Profile`}
          </Link>
        </li>
        <li className="nav-item">
        <Link className={isActive(history,"/createPost")} style={{cursor:"pointer"}} to ="/createPost">
            Create Post
          </Link>
        </li>
        <li className="nav-item">
        <a className="nav-link" style={{cursor:"pointer"}} onClick={()=>signout(()=>history.push('/'))}>
            Sign Out
          </a>
        </li>
        </>
        ):
      (<>
        <li className="nav-item">
      <Link className={isActive(history,"/signup")} to="/signup">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
      <Link className={isActive(history,"/signin")} to="/signin">
          Sign In
        </Link>
        </li>
        </>
      )
    }
        </ul>
  );
};
export default withRouter(Navbar)