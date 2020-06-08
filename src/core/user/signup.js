import React, { Component } from "react";
import {Link} from 'react-router-dom'
export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      Username: "",
      password: "",
      error:'',
      open:false
    };
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
    return fetch("https://mern-stack-web-application.herokuapp.com/signup", {
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
  render() {
    const{error,open}=this.state;
    return (
      <div className="container-fluid">
        <h2 className="mt-5 mb-5"> SignUp</h2>
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
                Email
              </span>
            </div>
            <input
              type="text"
              value={this.state.email}
              class="form-control"
              placeholder="Your Email"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(email) => {
                this.setState({ email: email.target.value });
              }}
            ></input>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Name
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              value={this.state.Username}
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(name) => {
                this.setState({ Username: name.target.value });
              }}
            ></input>
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                Password
              </span>
            </div>
            <input
              type="text"
              class="form-control"
              value={this.state.password}
              placeholder="Password"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(password) => {
                this.setState({ password: password.target.value });
              }}
            ></input>
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
