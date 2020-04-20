import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom'
export default class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error:'',
      open:false,
      redirect:false,
      loading:false,
    };
  }
    
  authenticate=({token,user},next)=>{
   console.log(token,user)
   if(typeof window !== undefined){
    
    localStorage.setItem("jwt",JSON.stringify(token));
    localStorage.setItem("user",JSON.stringify(user))
    next();
   }
   
  }
  handleSubmmit = (e) => {
    e.preventDefault();
    this.setState({loading:true})
    const {  email, password } = this.state;
    const user = {  email, password };
    console.log(user);

    this.handleSignIn(user)
    .then(data=>{
        console.log(data)
        if(data.error){
            this.setState({
                error:data.error,
                loading:false
            })
        }
            else{
                this.authenticate(data,()=>{
                 this.setState({
                     redirect:true
                 })
                })
            }
        }
    )
       
  };

  handleSignIn=(user)=>{
    return fetch("http://localhost:5000/signIn", {
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
    const{error,open,redirect,loading}=this.state;

    if(redirect){
      return <Redirect to="/"/>
    }
    return (
      <div className="container-fluid">
        <h2 className="mt-5 mb-5"> SignIn</h2>
        <div class="alert alert-success" role="alert" style={{display:open? "":"none"}}>
                  Succesfully Logged in!!
             </div>
           <div class="alert alert-warning" role="alert" style={{display:error? "":"none"}}>
                  {error}
             </div>
      
             <div className="jumbotron" style={{display:loading? '':'none'}}>
             Loading......
             </div>
        <form>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
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
            SignIn
          </button>
        </form>
      </div>
    );
  }
}
