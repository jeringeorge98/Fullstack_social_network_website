import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
import { isAuthenticateUser,isAuthenticate, } from "../../auth";
import {deleteUser,signOut,suggestUsers} from './Userapi'
import FollowButton from '../components/followButton'
import Profilemodal from '../components/Profiletabs'
import Batman from "../../assets/batman.png"
export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: "",
      user: [],
      loading:false,
      flag:false,
      modalVisible:false,
      following:false
    };
  }

  checkFollowing=(user)=>{
    const jwt=isAuthenticateUser();
    const match  =user.followers.find(follower=>{
      return follower._id===jwt._id
    }
      )
      return match;
  }
 componentDidMount() {
    // get token
    
    let token = isAuthenticate();
    // token=JSON.stringify(token)
    //console.log(this.state.userid);
         let userId= isAuthenticateUser()._id;
    //let user = await JSON.parse(localStorage.getItem("user"));
        // this.setState({loading:true})
        // console.table(token,userId)
     suggestUsers(token,userId).then(data=>{
    console.log(data)
      this.setState({
     loading:false,
     user:data
    })   
    })
     .catch(err=>{
       console.log(err)
     })
  }
 


  // OnclickFollow=(apicall)=>{
  //  let userId=isAuthenticateUser();
  //  let token =isAuthenticate();
  //   let followId=this.state.userid   
  //   apicall(token,userId,followId).then(data=>{
  //   if(data.error){
  //     this.setState({
  //       error:data.error
  //     })
  //   }
    
  //     console.log(data)
  //   this.setState({
  //     following:!this.state.following,
         
  //   })
  

  //   }).catch(error=>{
  //            console.log(error)
  //   })
  //   window.location.reload();
  // }
  // modelClose=()=>{
  //   this.setState({modalVisible:false})
  // }
  // OpenModal=()=>{
  //   console.log('hello')
  //   this.setState({
  //     modalVisible:true
  //   })
  // }
  renderUsers=user=>{
    console.log(user)
    return(
    <div className="row">
      {user.map((user, index) => (
        <div className="card col-6" style={{width: "18rem",margin:"5%"}} key={index}>
          <img className="card-img-top" src={`http://localhost:5000/user/photo/${user._id}`} onError={i=>i.target.src=`${Batman}`}  alt="Card image cap" style={{width:'auto',height:'200px',objectFit:'cover',}}/>
          <div className="card-body">
            <h5 className="card-title">{user.Username}</h5>
            <p className="card-text">
             {user.email}
            </p>
            <Link to={`/user/${user._id}`} className="btn btn-raised btn-primary">
              View Profile
            </Link>
          </div>
        </div>
      ))}
  
    </div>
    )
      }

  render() {
    const {user}=this.state
    
      return(
        <div className="container">
        <h2 className="mt-5 mb-5">
        Follow Users
        </h2>
        <div>
          {this.renderUsers(user)}       
        </div>
        </div>
      )
      
}
}
