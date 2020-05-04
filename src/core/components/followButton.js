import React,{Component} from "react" 
import {followUser} from '../user/Userapi'
const FollowButton=(props)=>{

return(
    <div>
    {!props.follow?(<button className="btn btn-success" style={{margin:'2%'}} onClick={()=>props.onButtonClick(followUser)}>
    FOLLOW
    </button>):(<button type="button" class="btn btn-danger" style={{margin:'2%'}} onClick={()=>this.handleDelete(this.state.userid)}>Unfollow</button>)}
    
    
    </div>

)

}

export default FollowButton