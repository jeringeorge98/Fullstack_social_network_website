import React, { Component } from 'react'
import {getSinglePost} from './postApi'
import { isAuthenticate } from '../auth';
import {updatePost} from '../posts/postApi'
import { Redirect } from 'react-router-dom';
export default class EditPost extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id:'',
             title:'',
             body:'',
             post:{},
             loading:false,
             redirectTo:false
        }
    }
    
    componentDidMount(){
        this.postdata=new FormData();
        const postId =this.props.match.params.postId;
    this.init(postId)
    }
    init=(postId)=>{
      this.setState({
        id:postId
      })
     getSinglePost(postId).then(resp=>
        this.setState({
            title:resp.title,
            body:resp.body,
            photo:resp.photo,
            
        })
       
     ).catch(err=>{
         console.log(err)
     })
    }

    // handle change
    handleChange = (name) => (event) => {
      const value = name === "photo" ? event.target.files[0] : event.target.value;
      this.postdata.set(name, value);
      this.setState({ [name]: value });
    };


handleUpdate=(e)=>{
e.preventDefault();
this.setState({ loading: true });
let token=isAuthenticate();
let postid= this.state.id;
updatePost(postid, token, this.postdata)
.then((data) => {
  this.setState({
    loading:false
  })
  if (data.error) {
    console.log(data.error);
    
  }
  else{
    this.setState({
      redirectTo:true
    })
  }
          
})
.catch((err) => {
  console.log(err);
});
}

    editPostForm=(post)=>{
const{loading,title,body,photo,id}=this.state

return(
   <div className="container">
   <h2 className="mt-5 mb-5">Edit Post</h2>
        <div className="jumbotron" style={{ display: loading ? "" : "none" }}>
          Loading......
        </div>
        <div className="card-body" style={{display:photo?"":"none"}}>
             <img className="card-img-center" src={`http://localhost:5000/post/photo/${id}`}  alt="Card image cap" style={{width:'auto',height:'250px',objectFit:'cover'}} />
             </div>
    <form>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Title
              </span>
            </div>
            <input
              type="text"
              value={title}
              class="form-control"
              placeholder="Title"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={this.handleChange("title")}
            ></input>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                 Photo
              </span>
            </div>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={this.handleChange("photo")}
            ></input>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Body
              </span>
            </div>
            <textarea
              class="form-control"
              value={body}
              placeholder="Write something!"
              aria-label="With textarea"
              onChange={this.handleChange("body")}
            ></textarea>
          </div>
          <button
            className="btn btn-raised btn-primary"
            onClick={this.handleUpdate}
          >
            Update
          </button>
        </form>
        </div>
)

    }

    render() {
        const{post,redirectTo}=this.state;
        if(redirectTo){
          return(
            <Redirect
            to="/"/>
          )
        }
        return (
            <div>
                
            {this.editPostForm(post)}
            </div>
        )
    }
}
