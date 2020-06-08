import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticateUser, isAuthenticate } from "../../auth";
import { deleteUser, signOut } from "./Userapi";
import FollowButton from "../components/followButton";
import Profilemodal from "../components/Profiletabs";
import Batman from "../../assets/batman.png";
import { PostbyUser } from "../../posts/postApi";
export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userid: this.props.match.params.userId,
      user: { followers: [], following: [] },
      loading: false,
      flag: false,
      modalVisible: false,
      following: false,
      posts:[]
    };
  }

  checkFollowing = (user) => {
    const jwt = isAuthenticateUser();
    const match = user.followers.find((follower) => {
      return follower._id === jwt._id;
    });
    return match;
  };
  async componentDidMount() {
    // get token
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
        const following = this.checkFollowing(data.user);
        this.setState({
          loading: false,
          user: data.user,
          following,
        });
      })
      .catch((err) => console.log(err));
    this.loadUserPosts(this.state.userid, token);
  }
  async componentWillReceiveProps(props) {
    // get token
    let token = isAuthenticate();
    const userid = props.match.params.userId;
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
          loading: false,
          user: data.user,
          userid: userid,
        });
      })
      .catch((err) => console.log(err));
  }
  loadUserPosts = (userId, token) => {
    PostbyUser(userId, token)
      .then((data) => this.setState({posts:data}))
      .catch((err) => console.log(err))
  };
  handleDelete = (id) => {
    const token = isAuthenticate();
    console.log(token);
    // console.table(id,token)
    const response = window.confirm(
      "Are you sure you wanna delete the account"
    );
    if (response) {
      deleteUser(id, token)
        .then((resp) => {
          console.log(resp);
          signOut().then((resp) => {
            console.log(resp);
            this.setState({
              flag: true,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  OnclickFollow = (apicall) => {
    let userId = isAuthenticateUser();
    let token = isAuthenticate();
    let followId = this.state.userid;
    apicall(token, userId, followId)
      .then((data) => {
        if (data.error) {
          this.setState({
            error: data.error,
          });
        }

        console.log(data);
        this.setState({
          following: !this.state.following,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  };
  modelClose = () => {
    this.setState({ modalVisible: false });
  };
  OpenModal = () => {
    console.log("hello");
    this.setState({
      modalVisible: true,
    });
  };
  render() {
    const { user, loading, userid, flag,posts } = this.state;
    console.log(flag);
    if (flag) {
      return <Redirect to="/" />;
    }
    const photoUrl = userid ? (
      `https://mern-stack-web-application.herokuapp.com/user/photo/${userid}`
    ) : (
      <Batman />
    );
    console.log(photoUrl);

    return (
      <>
        {loading ? (
          <div className="jumbotron">
            <h1>loading.......</h1>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-6">
                <h2 className="mt-5 mb-5">Profile section</h2>
                <img
                  className="card-img-top"
                  src={photoUrl}
                  onError={(i) => (i.target.src = `${Batman}`)}
                  alt="Card image cap"
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div className="col md-12 mt-5 mb-5">
                  <h5 className="mt-5 mb-5">About Me:</h5>
                  <p className="lead">{user.about || ""}</p>
                </div>
                <hr />
                {/*<ProfileTab followers={user.followers} following ={user.following}/>*/}
              </div>
              <div className="col-6" style={{ marginTop: "5%" }}>
                <div>
                  <h3 className="mt-5 mb-5">
                    {isAuthenticateUser() &&
                    isAuthenticateUser()._id == this.state.userid
                      ? `Hello ${user.Username}!!`
                      : `${user.Username}`}
                  </h3>
                  <h4 className="mt-5 mb-5">Email: {user.email}</h4>
                  <p className="mt-5 mb-5">
                    {" "}
                    {`Joined on ${new Date(user.created).toDateString()}`}
                  </p>
                  <div className="row">
                    <div className="col-6">
                      <span
                        className="font-weight-light"
                        style={{
                          fontSize: "25px",
                          color: "blue",
                          cursor: "pointer",
                        }}
                        onClick={() => this.OpenModal()}
                      >
                        {`${user.followers.length} followers`}{" "}
                      </span>
                    </div>
                    <div className="col-6">
                      <p
                        className="font-weight-light"
                        style={{
                          fontSize: "25px",
                          color: "green",
                          cursor: "pointer",
                        }}
                      >
                        {`${user.following.length || 0} following`}{" "}
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ margin: "2%" }}>
                  {isAuthenticateUser() &&
                  isAuthenticateUser()._id == this.state.userid ? (
                    <>
                      <Link
                        className="btn btn-success"
                        style={{ margin: "2%" }}
                        to={`/user/update/${this.state.userid}`}
                      >
                        Edit Profile
                      </Link>
                      <button
                        type="button"
                        class="btn btn-danger"
                        style={{ margin: "2%" }}
                        onClick={() => this.handleDelete(this.state.userid)}
                      >
                        Delete Profile
                      </button>
                      <div
                        class="dropdown-divider"
                        style={{ color: "black" }}
                      ></div>
                      <div>
                        <p className="lead" style={{ fontSize: "25px" }}>
                          Posts{" "}
                        </p>
                         {posts.map((post,index)=>{
                           return(
                             <div key={index}>
                             <div>
                             <Link to={`/post/${post._id}`}>
                            <p className="lead">{post.title}</p> 
                             </Link>
                             </div>
                             </div>
                           )
                           }
                         )
                         }
                      </div>
                    </>
                  ) : (
                    <FollowButton
                      follow={this.state.following}
                      onButtonClick={this.OnclickFollow}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        }
        <Profilemodal
          modalVisible={this.state.modalVisible}
          modalClose={() => this.modelClose()}
          followers={this.state.user.followers}
        />
      </>
    );
  }
}
