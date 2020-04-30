import React, { Component } from 'react'
import { isAuthenticateUser,isAuthenticate, } from "../../auth";
import {updateUser} from './Userapi'
export default class EditProfile extends Component {
constructor(props) {
    super(props)

    this.state = {
         userid:this.props.match.params.userId,
         email:'',
         name:'',
         password:''
    }
}


    async componentDidMount() {
        // get token
        let token = isAuthenticate();
        // token=JSON.stringify(token)
        console.log(this.state.userid);
        //let user = await JSON.parse(localStorage.getItem("user"));
            // this.setState({loading:true})
         fetch(`http://localhost:5000/user/${this.state.userid}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resp) => resp.json())
          .then((data) => {
            console.log(data);
            this.setState({
              email: data.user.email,
              name:data.user.Username,

            });
          })
          .catch((err) => console.log(err));
      }


      handleUpdate=(e)=>{
         e.preventDefault();
         const {email,name,password,userid}=this.state;
         let token =isAuthenticate()
         const user={
           email,
           Username:this.state.name,
           password:password || undefined
         }
         updateUser(userid,token,user).then(data=>{
             console.log(data,"updated")
         })
         .catch(err=>{console.log(err)})
      }

    render() {
        const{email,name}=this.state;
        return (
            <div className="container">
            <h2 className="mt-5 mb-5">Edit Profile</h2>
            <form>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Email
              </span>
            </div>
            <input
              type="text"
              value={email}
              class="form-control"
              placeholder="Your Email"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(text) => {
                this.setState({ email: text.target.value });
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
              value={name}
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(name) => {
                this.setState({ name: name.target.value });
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
            onClick={this.handleUpdate}
          >
            Update
          </button>
        </form> 
            </div>
        )
    }
}
