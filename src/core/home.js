import React,{Component} from 'react';
import update from 'react-addons-update';
import {getPosts} from '../posts/postApi'
import {Link} from "react-router-dom";
import {isAuthenticateUser} from "../auth/index"
export default class Home extends Component{

  constructor(props) {
    super(props)
  
    this.state = {
       posts:[],
       readMore:[]
    }
  }
  
componentDidMount(){
let arr=[];
  getPosts().then(data=>{
  console.log(data)
  this.setState({
    posts:data
  })
  for(let i=0;i<data.length;i++){
  arr[i]=false
  }
  this.setState({
    readMore:arr
  })
  console.log(arr)
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
  expand=(index)=>{

    this.setState(update(this.state,{
      readMore:{
        [index]:{
         $set: true
        }
      }
    })
    )
  }
  render(){
    const {posts,readMore}=this.state
    if(!isAuthenticateUser()){
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
         {!posts.length? (<h1 style={{color:'white'}} className="lead">Loading....</h1>):(
          <h1 style={{color:'black'}}>Welcome !</h1>
         )}
          <div class="dropdown-divider"></div>
          <h3 style={{color:'black'}} className="lead">Recent Posts</h3>
          {posts.map((item,index)=>{

            const posterId =item.postedBy? item.postedBy._id:"";
            const postedName =item.postedBy? item.postedBy.Username:"Unknown";
            return(
            <div className="row">
          <div class="card" style={{width:"80rem"}}>
          <div class="card-body">
            <h5 class="card-title">{item.title}</h5>
            {readMore[index]?(
              <p class="card-text">{item.body}</p> 
            ):(<p class="card-text">{item.body.substring(0,100)}... 
            <span className="card-text" style={{fontSize:'15px',color:'blue',cursor:'pointer'}} onClick={()=>this.expand(index)}>Read More</span>
            </p>)}
             
             <p className="font-italic mark">Posted By {""}
             <Link to ={`/user/${posterId}`}>{postedName} {""}</Link>
              on {`${new Date(item.created).toDateString()}`}
             </p> 
             <div className="card-body" style={{display:item.photo?"":"none"}}>
             <img className="card-img-center" src={`http://localhost:5000/post/photo/${item._id}`}  alt="Card image cap" style={{width:'auto',height:'250px',objectFit:'cover'}} />
             </div>
             <Link class="btn btn-primary" to={`/post/${item._id}`}>View Post</Link>
             </div>
          
        
        </div>
        <div class="dropdown-divider"></div>          
          </div>
          
          )
            }
            )
          }
          </div>
        
        </div>
    )
}
}

