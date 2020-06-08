const url= "https://mern-stack-web-application.herokuapp.com"

export const list=()=>{

    return fetch(url+"/users", {
       method: "GET",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json"
       },
     })
       .then((resp) => resp.json())
       // .then((data) => {
       //   console.log(data);
       //   this.setState({
       //    loading:false,
       //     user: data.user,
       //   });
       // })
       .catch((err) => console.log(err));
 
   }
   // delete user api
   export const deleteUser=(id,token)=>{
      return fetch(url+`/user/delete/${id}`,{
        method:'DELETE',
        headers: {
          Accept: "application/json",
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },    
      }).then(resp=>resp.json())
      .catch(err=>console.log(err))
   }
   // Signout User
   export const signOut=()=>{
    
    
    if(typeof window!== undefined)
     {
         localStorage.removeItem("jwt");
         localStorage.removeItem("user");
     }
   
   
    return fetch(url+"/signout",{
      method:'GET',
  }).then(resp=>{
      console.log(resp.json)
  })
  .catch(err=>console.log(err))
}
   
//Update user

export const updateUser=(id,token,user)=>{
  console.log('Userdata',user)
  return fetch(url+`/user/update/${id}`,{
    method:'PUT',
    headers: {
      Accept: "application/json",
      Authorization:`Bearer ${token}`
    },
    body:user    
  }).then(resp=>resp.json())
  .catch(err=>console.log(err))
}

export const updateLocalinfo=({Username,email,_id},next)=>{

  if(typeof window !="undefined"){
    let auth =JSON.parse(localStorage.getItem("user"))
    console.log(auth,"1")

       auth={Username,email,_id}
       console.log(auth,"2")
        localStorage.setItem("user",JSON.stringify(auth))
        next();
  }
}

export const followUser =(token,userId,followId)=>{
  console.table(token,userId._id,followId)
  return fetch(url+"/user/follow",{
    method:'PUT',
    headers: {
      Accept: "application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({userId:userId._id,followId})
  }).then(resp=>resp.json())
  .catch(err=>console.log(err)) 
}

export const unfollowUser =(token,userId,unfollowId)=>{
  console.table(token,userId._id,unfollowId)
  return fetch(url+"/user/unfollow",{
    method:'PUT',
    headers: {
      Accept: "application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({userId:userId._id,unfollowId})
  }).then(resp=>resp.json())
  .catch(err=>console.log(err)) 
}

// suggest users
export const suggestUsers =(token,userId)=>{
  return fetch(url+`/user/suggestUser/${userId}`,{
    method:'GET',
    headers: {
      Accept: "application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
  
  }).then(resp=>resp.json())
  .catch(err=>console.log(err)) 
}