import React, { Component } from 'react'
import {Link,Redirect} from'react-router-dom';
import {isAuthenticateUser, isAuthenticate} from "../auth/index"
import {getSinglePost,removePost} from '../posts/postApi'
export default class singlePost extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           post:{},
           loading:false ,
           redirecTo:false
        }
    }
    
    componentDidMount(){
          const postId= this.props.match.params.postId;
         getSinglePost(postId).then(resp=>{
           this.setState({
               post:resp,
               loading:true,

           })
        console.log(resp)
         }) 
         .catch(err=>{
             console.log(err)
         })         
    }

    deletePost=(postId)=>{
        let token=isAuthenticate()
        
    const response = window.confirm(
        "Are you sure you wanna delete the post?"
      );
      if(response){
        removePost(postId,token).then(resp=>{
            window.alert("Post has been deleted")
            console.log(resp)
        }
        ).catch(err=>{
            console.log(err)
        })
      }
      
    }
    renderPost=(post)=>{
        const posterId =post.postedBy? post.postedBy._id:""
         const postedName =post.postedBy? post.postedBy.Username:"Unknown";

return(
    <div class="card-body">
    <h3 class="display-4 mt-5 mb-5">{post.title}</h3>
    
      <p class="card-text">{post.body}</p> 
     
     <p className="font-italic mark">Posted By {""}
     <Link to ={`/user/${posterId}`}>{postedName} {""}</Link>
      on {`${new Date(post.created).toDateString()}`}
     </p> 
     <div className="card-body" style={{display:post.photo?"":"none"}}>
     <img className="card-img-center" src={`http://localhost:5000/post/photo/${post._id}`}  alt="Card image cap" style={{width:'100%',height:'350px',objectFit:'cover'}} />
     </div>
     <Link class="btn btn-primary" to={`/`}>Back to Home</Link>
     {isAuthenticateUser() &&
        isAuthenticateUser()._id == post.postedBy._id ?(
     <>
            <Link
                        type="button"
                        class="btn btn-success"
                        style={{ margin: "2%" }}
                         to={`/post/edit/${post._id}`}
                      >
                        Update Post
                      </Link>
     
                      <button
                        type="button"
                        class="btn btn-danger"
                        style={{ margin: "2%" }}
                        onClick={()=>this.deletePost(post._id)}
                      >
                        Delete Post
                      </button>
       </>
                      ):(
            <div/>
        )
                      }
     </div>
 

)

    }
    render() {
        const {loading,post,redirecTo}=this.state;
        if(redirecTo){
            return(
             <Redirect
             to="/"/>
            )
        }
        return (
            <div className=
            "container-fluid">
            {!loading?(<div className="jumbotron" style={{display:loading? '':'none'}}>
            Loading......
        </div>):(
            this.renderPost(post)
        )}
         {/*   <div className="jumbotron" style={{display:loading? '':'none'}}>
            Loading......
        </div>*/}
                
            </div>
        )
    }
}
