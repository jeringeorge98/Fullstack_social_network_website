import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {isAuthenticateUser} from '../auth/index'
export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      error:'',
      user:{},
      open:false
    };
  }

componentDidMount(){

this.postData =new FormData();

this.setState({
    user:isAuthenticateUser()
})

}

  handleSubmmit = (e) => {
    e.preventDefault();
    const { Username, email, password } = this.state;
    const user = { Username, email, password };
    console.log(user);

    this.handleSignUp(user)
    .then(data=>{
        console.log(data)
        if(data.error){
            this.setState({
                error:data.error
            })
        }
            else{
                this.setState({
                    Username:'',
                    email:'',
                    password:'',
                    error:'',
                    open:true
                })
            }
        }
    )
       
  };

  handleSignUp=(user)=>{
    return fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body:JSON.stringify(user)
    }).then(resp=>{
        return resp.json()
    })
  }
  handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    this.userData.set(name, value);
    this.setState({ [name]: value });
  };

  isValid=()=>{


    
  }
  render() {
    const{error,open}=this.state;
    return (
      <div className="container-fluid">
        <h2 className="mt-5 mb-5"> Create a Post</h2>
        <div className="alert alert-success" role="alert" style={{display:open? "":"none"}}>
                  Succesfully signed up!! Please<Link to="/signin">Sign in</Link>
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
              placeholder="Your Email"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={this.handleChange("title")}
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
            Signup
          </button>
        </form>
      </div>
    );
  }
}
