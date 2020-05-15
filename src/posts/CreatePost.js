import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {isAuthenticateUser, isAuthenticate} from '../auth/index'
import {createPost} from "./postApi"
export default class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      error:'',
      user:{},
      filesize:0,
      open:false,
      loading:false
    };
  }

componentDidMount(){

this.postData =new FormData();

this.setState({
    user:isAuthenticateUser()
})

}

  handleSubmmit = (e) => {
    this.setState({
      loading:true
    })
    e.preventDefault();
    // const { title, body, password } = this.state;
    // const user = { Username, email, password };
    
      let token =isAuthenticate();
      let userId=isAuthenticateUser()._id;
      // console.log(this.postData,token,userId);
      if(this.isValid()){
        createPost(token,userId,this.postData).then(resp=>{
          console.log(resp)
          this.setState({
            loading:false,
            open:true,
            title:'',
            body:'',
            photo:''
          })
        })
        .catch(err=>{
        console.log(err)
        })
      }
      
       
  };

  handleChange = (name) => (event) => {
    
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    this.postData.set(name, value);
    
    this.setState({ [name]: value });
  };

  isValid=()=>{
const {title,body,filesize}=this.state;
if(body===''|| title===''){
  this.setState({
    error:'All fields required'
  })
  return false
}
else if(filesize>10000){
  this.setState({
    error:'Uploaded file exceeds the file size'
  })
  return false
}
    return true
  }
  render() {
    const{error,loading,open}=this.state;
    return (
      <div className="container-fluid">
        <h2 className="mt-5 mb-5"> Create a Post</h2>
        <div className="jumbotron" style={{ display: loading ? "" : "none" }}>
        Loading......
      </div>
        <div className="alert alert-success" role="alert" style={{display:open? "":"none"}}>
                Sucessfully Posted !!!
             </div>
           <div className="alert alert-warning" role="alert" style={{display:error? "":"none"}}>
                  {error}
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
              value={this.state.title}
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
                Profile Photo
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
              value={this.state.body}
              placeholder="Write something!"
              aria-label="With textarea"
              onChange={this.handleChange("body")}
            ></textarea>
          </div>
          <button
            className="btn btn-raised btn-primary"
            onClick={this.handleSubmmit}
          >
            Post!
          </button>
        </form>
      </div>
    );
  }
}
