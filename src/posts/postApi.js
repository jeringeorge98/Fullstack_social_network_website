export const create =(token,userId,post)=>{
    return fetch(`http://localhost:5000/post/new/${userId}`,{
      method:'POST',
      headers: {
        Accept: "application/json",
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:post
    }).then(resp=>resp.json())
    .catch(err=>console.log(err)) 
  }