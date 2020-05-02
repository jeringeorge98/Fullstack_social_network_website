import React, { Component } from "react";
import {Link, Redirect} from 'react-router-dom';
import { isAuthenticateUser,isAuthenticate, } from "../../auth";
import {deleteUser,signOut} from './Userapi'
import Batman from "../../assets/batman.png"
export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: this.props.match.params.userId,
      user: {},
      loading:false,
      flag:false
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
  }
  async componentWillReceiveProps(props) {
    // get token
    let token = isAuthenticate();
    const userid=props.match.params.userId;
    // token=JSON.stringify(token)
    //let user = await JSON.parse(localStorage.getItem("user"));
        // this.setState({loading:true})
     fetch(`http://localhost:5000/user/${userid}`, {
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
          userid:userid
        });
      })
      .catch((err) => console.log(err));
  }
  handleDelete=(id)=>{
    const token =isAuthenticate();
    console.log(token)
    // console.table(id,token)
      const response =window.confirm('Are you sure you wanna delete the account')
      if(response){
        deleteUser(id,token).then(resp=>{
          console.log(resp)
            signOut().then(resp=>{
              console.log(resp)
              this.setState({
                flag:true
              })
            })
            
        })
        .catch(err=>{
          console.log(err)
        })
      }

  }
  render() {
      const{user,loading,userid,flag}=this.state;
console.log(flag)
       if(flag){
         return <Redirect to="/"/>
       }      
       const photoUrl=userid?`http://localhost:5000/user/photo/${userid}`: <Batman/>
       console.log(photoUrl)
      return (
        <>
       {loading?(<div className="jumbotron">
       
       <h1>loading.......</h1> 
        </div>):

      (<div className="container">
      <div className="row">
      <div className="col-6">
        <h2 className="mt-5 mb-5">Profile section</h2>
        <img className="card-img-top" src={photoUrl} onError={i=>i.target.src=`${Batman}`} alt="Card image cap" style={{width:'100%',height:'200px',objectFit:'cover',}} />
        <div className="col md-12 mt-5 mb-5" >
        <h5 className="mt-5 mb-5">About Me:</h5>
        <p className="lead">{user.about|| "Write something about yourself"}</p>
        </div >
        </div>
        <div className="col-6" style={{marginTop:"5%",}}>
        <div>
        <h3 className="mt-5 mb-5">Hello {user.Username}!! </h3>
        <h4 className="mt-5 mb-5">Email: {user.email}</h4>
        <p className="mt-5 mb-5"> {`Joined on ${new Date(user.created).toDateString()}`}</p>        
        </div>
        
        <div style={{margin:'2%'}}>
        {isAuthenticateUser() && isAuthenticateUser()._id == this.state.userid && (
          <>
       <Link className="btn btn-success" style={{margin:'2%'}} to ={`/user/update/${this.state.userid}`}>
       Edit Profile
       </Link>
       <button type="button" class="btn btn-danger" style={{margin:'2%'}} onClick={()=>this.handleDelete(this.state.userid)}>Delete Profile</button>
       </>     
      )}
      </div>
        </div>
        </div>
        </div>)
      }}
        </>
    );
  }
}
