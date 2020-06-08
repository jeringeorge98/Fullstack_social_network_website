import React, { Component } from "react";
import { isAuthenticateUser, isAuthenticate } from "../../auth";
import { updateUser,updateLocalinfo } from "./Userapi";
import Batman from "../../assets/batman.png";
import { Redirect } from "react-router-dom";
export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: this.props.match.params.userId,
      email: "",
      Username: "",
      password: "",
      photo: "",
      about:'',
      redirectto: false,
      loading: false,
    };
  }

  async componentDidMount() {
    // get token
    this.userData = new FormData();
    let token = isAuthenticate();
    // token=JSON.stringify(token)
    console.log(this.state.userid);
    //let user = await JSON.parse(localStorage.getItem("user"));
    // this.setState({loading:true})
    fetch(`https://mern-stack-web-application.herokuapp.com/user/${this.state.userid}`, {
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
          Username: data.user.Username,
          about:data.user.about 
        });
      })
      .catch((err) => console.log(err));
  }

  handleUpdate = (e) => {
    e.preventDefault();
    this.setState({ loading: true });

    const { email, Username, password, userid, photo } = this.state;
    let token = isAuthenticate();
    // let user={
    //    email,
    //    Username:this.state.name,
    //    password:password || undefined,
    //    photo
    //  }
    updateUser(userid, token, this.userData)
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        }
                updateLocalinfo(data.user,()=>{
                  this.setState({
                    redirectto: true,
                    loading: false,
                  });
                })
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    this.userData.set(name, value);
    this.setState({ [name]: value });
  };

  render() {
    const { email, Username, redirectto, userid, loading,about } = this.state;
    if (redirectto) {
      return <Redirect to={`/user/${userid}`} />;
    }
    const photoUrl = userid ? (
      `https://mern-stack-web-application.herokuapp.com/user/photo/${userid}`
    ) : (
      <Batman />
    );
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>
        <div className="jumbotron" style={{ display: loading ? "" : "none" }}>
          Loading......
        </div>
        <img
          src={photoUrl}
          alt={Username}
          onError={(i) => (i.target.src = `${Batman}`)}
          style={{ width: "auto", height: "200px" }}
        />
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
              value={Username}
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={this.handleChange("Username")}
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
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">About Me</span>
            </div>
            <textarea
              class="form-control"
              value={about}
              placeholder="Write something!"
              aria-label="With textarea"
              onChange={this.handleChange("about")}
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
    );
  }
}
