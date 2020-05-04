export const list=()=>{

    return fetch(`http://localhost:5000/users`, {
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
      return fetch(`http://localhost:5000/user/delete/${id}`,{
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
   
   
    return fetch("http://localhost:5000/signOut",{
      method:'GET',
  }).then(resp=>{
      console.log(resp.json)
  })
  .catch(err=>console.log(err))
}
   
//Update user

export const updateUser=(id,token,user)=>{
  console.log('Userdata',user)
  return fetch(`http://localhost:5000/user/update/${id}`,{
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

export const followUser =(token,userid,followid)=>{
  return fetch(`http://localhost:5000/user/follow`,{
    method:'PUT',
    headers: {
      Accept: "application/json",
      "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
    body:JSON.stringify({userid,followid})
  }).then(resp=>resp.json())
  .catch(err=>console.log(err)) 
}