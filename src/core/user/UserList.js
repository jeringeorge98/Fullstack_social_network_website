import React, { Component } from "react";
import { list } from "./Userapi";
import {Link} from 'react-router-dom';
import Batman from "../../assets/batman.png"
export default class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    list().then((data) => {
      if (data.error) console.log(data.error);
      else
        this.setState({
          users: data,
        });
    });
  }
  renderUsers=users=>(
          <div className="row">
            {users.map((user, index) => (
              <div className="card col-6" style={{width: "18rem"}} key={index}>
                <img className="card-img-top" src={Batman} alt="Card image cap" style={{width:'100%',height:'15vw',objectFit:'cover',}}/>
                <div className="card-body">
                  <h5 className="card-title">{user.Username}</h5>
                  <p className="card-text">
                   {user.email}
                  </p>
                  <Link to={`/user/${user._id}`} className="btn btn-raised btn-primary">
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
        
          </div>
      )
  
  render() {
      const {users}=this.state;
      console.log(typeof users)
      console.log(users[0],"users")
    return (
        <div className="container">
        <h2 className="mt-5 mb-5">
        Users
        </h2>
        <div>
        {this.renderUsers(users)}
        </div>
        </div>
    )
  }
}
