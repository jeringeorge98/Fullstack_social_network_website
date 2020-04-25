import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { isAuthenticateUser,isAuthenticate } from "../../auth";
export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: this.props.match.params.userId,
      user: {},
      loading:false
    };
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
         loading:false,
          user: data.user,
        });
      })
      .catch((err) => console.log(err));

    this.getUser();
  }
  getUser = () => {
    // console.log(this.props.match.params.userId)
    //     fetch(`http://localhost:5000/user/${this.props.match.params.userId}`,{
    //         method:'GET',
    //         headers:
    //     }).then(resp=>{
    //     console.log(resp)
    //     }
  };
  render() {
      const{user,loading,userid}=this.state;
console.log(this.state.userid)      
      return (
        <>
       {loading?(<div className="jumbotron">
       
       <h1>loading.......</h1> 
        </div>):

      (<div className="container">
      <div className="row">
      <div className="col-6">
        <h2 className="mt-5 mb-5">Profile section</h2>
        <h3>Hello {user.Username}!! </h3>
        <h4>Email: {user.email}</h4>
        <p> {`Joined on ${new Date(user.created).toDateString()}`}</p>
        </div>
        <div className="col-6" style={{marginTop:"5%",}}>
        {isAuthenticateUser() && isAuthenticateUser()._id == this.state.userid && (
            <>
         <Link className="btn btn-success" style={{margin:'2%'}} to ={`/user/update/${this.state.userid}`}>
         Edit Profile
         </Link>
         <button type="button" class="btn btn-danger" style={{margin:'2%'}}>Delete Profile</button>
         </>     
        )}        
        </div>
        </div>
        </div>)
      }
        </>
    );
  }
}
