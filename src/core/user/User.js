import React, { Component } from 'react'
import{isAuthenticate} from '../../auth'
export default class User extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           userid:'' ,
           user:{} 
        }
    }
    async componentDidMount(){
        // get token
        let token=isAuthenticate()
       // token=JSON.stringify(token)
        console.log(token)
         let user= await JSON.parse(localStorage.getItem("user"))

          fetch(`http://localhost:5000/user/${this.props.match.params.userId}`,{
              method:'GET',
              headers:{
                Accept:"application/json",
                 "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
              } 
            }).then(resp=>
            resp.json())
            .then(data=>{
                console.log(data)
                this.setState({
                   user:data.user
                })
            })
            .catch(err=>console.log(err))          
          

         this.setState({
    userid:this.props.match.userId,      
})

        this.getUser();
    }
    getUser=()=>{
// console.log(this.props.match.params.userId)
//     fetch(`http://localhost:5000/user/${this.props.match.params.userId}`,{
//         method:'GET',
//         headers:
//     }).then(resp=>{

//     console.log(resp)
//     }

            
    }
    render() {
        const{user}=this.state
     console.log((user))
        return (
            <div className="jumbotron">
            <h2 className="mt-5 mb-5">Profile section</h2>
            <h3>Hello {user.Username}!! </h3>
            <h4>Email: {user.email}</h4>
             
              </div>
        )
    }
}
