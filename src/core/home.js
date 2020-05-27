import React,{Component} from 'react';
import {getPosts} from '../posts/postApi'
import {Link} from "react-router-dom";
import {isAuthenticateUser} from "../auth/index"
export default class Home extends Component{

  constructor(props) {
    super(props)
  
    this.state = {
       posts:[]
    }
  }
  
componentDidMount(){
getPosts().then(data=>{
  console.log(data)
  this.setState({
    posts:data
  })
})
.catch(err=>{
  console.log(err)
})

}
  renderPosts=()=>{
    return(
      <div className="row">
      <div class="card" style={{width:"80rem"}}>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        {/* <p class="card-text"></p> body goes here*/}
      </div>
    </div>          
      </div>
    )
  }
  
  render(){
    const {posts}=this.state
    if(!isAuthenticateUser() || posts.length===0){
      return(
        <div className="jumbotron">
        <h1>Welcome!</h1>
        <p className="lead">Your feed is empty login or follow users to get the posts</p>
        </div>
      )
    }
    
    return (
        <div className="jumbotron jumbotron-fluid"style={{backgroundColor:'#d6d5d2'}}>
          <div className="container">
          <h1>Welcome!</h1>
          <div class="dropdown-divider"></div>
          {posts.map((item,index)=>(
            <div className="row">
          <div class="card" style={{width:"80rem"}}>
          <div class="card-body">
            <h5 class="card-title">{item.title}</h5>
             <p class="card-text">{item.body}</p>
             <Link class="btn btn-primary">Read more</Link>
             </div>
          
        
        </div>
        <div class="dropdown-divider"></div>          
          </div>
          
          ))
          }
          </div>
        
        </div>
    )
}
}

