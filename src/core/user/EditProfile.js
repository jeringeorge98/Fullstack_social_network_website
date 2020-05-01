import React, { Component } from 'react'
import { isAuthenticateUser,isAuthenticate, } from "../../auth";
import {updateUser} from './Userapi'
import { Redirect } from 'react-router-dom';
export default class EditProfile extends Component {
constructor(props) {
    super(props)

    this.state = {
         userid:this.props.match.params.userId,
         email:'',
         name:'',
         password:'',
         photo:'',
         redirectto:false,
         loading:false
    }
}


    async componentDidMount() {
        // get token
        this.userData=new FormData();
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
         this.setState({loading:true})
         
         const {email,name,password,userid,photo}=this.state;
         let token =isAuthenticate()
        // let user={
        //    email,
        //    Username:this.state.name,
        //    password:password || undefined,
        //    photo
        //  }
         updateUser(userid,token,this.userData).then(data=>{
          if(data.error){
            console.log(data.error)
          }   
          
          this.setState({
           redirectto:true,
           loading:false
          })

         })
         .catch(err=>{console.log(err)})
  
      }

      handleChange =name=>event=>{
        const value =name==='photo'? event.target.files[0]:event.target.value
        this.userData.set(name,value)
        this.setState({[name]:value})
            }

    render() {
        const{email,name,redirectto,userid,loading}=this.state;
        if(redirectto){
          return(
          <Redirect to={`/user/${userid}`}/>
          )
        }
        return (
            <div className="container">
            <h2 className="mt-5 mb-5">Edit Profile</h2>
            <div className="jumbotron" style={{display:loading? '':'none'}}>
             Loading......
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
              value={email}
              class="form-control"
              placeholder="Your Email"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={this.handleChange("email")}
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
              onChange={this.handleChange("name")}
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
              onChange={this.handleChange("password")}
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
