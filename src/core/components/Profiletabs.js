import React, {Component} from "react"
import {Link} from "react-router-dom"
import {Modal} from 'antd';
import 'antd/dist/antd.css'
import {Batman} from '../../assets/batman.png'
 export default class Profilemodal extends Component{
   constructor(props) {
     super(props)
   
     this.state = {
        modalVisible:this.props.modalVisible                  
     }
   }
   setModalVisible(modalVisible) {
    this.props.modalClose();
  }
   renderModalContent=()=>{
return(
  <>
{this.props.followers.length!=0?(this.props.followers.map((follower,index)=>{
  return(
   <div id={index} className="row" style={{width:'auto'}}>
   
   <div className="col" style={{width:'100%',height:'10%',margin:'5%'}} key={index}>
   <img className="card-img-top" src={`https://mern-stack-web-application.herokuapp.com/user/photo/${follower._id}`} onError={i=>i.target.src=`${Batman}`}  alt="Card image cap" style={{width:'auto',height:'200px',objectFit:'cover',}}/>
   <div className="card-body">
     <h5 className="card-title">{follower.Username}</h5>
     <p className="card-text">
      {follower.email}
     </p>
     <Link to={`/user/${follower._id}`} className="btn btn-raised btn-primary">
       View Profile
     </Link>
   </div>
 </div>
 
   </div>
  )
  }
  )
):(
  <div>
  <h2>No Followers!!</h2>
  </div>
)

}

</>
)
        
   }
   render(){
     console.log('herer')
  return (
    <div>
    <Modal
    title="Followers"
    centered
    footer={null}
    visible={this.props.modalVisible}
    onOk={() => this.setModalVisible(false)}
    onCancel={() => this.setModalVisible(false)}
  >
    {this.renderModalContent()}
  </Modal>
    </div>
  );
};
 }

