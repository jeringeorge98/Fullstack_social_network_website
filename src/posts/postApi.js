const url= "https://mern-stack-web-application.herokuapp.com"

export const createPost=(token,userid,post)=>{
  return fetch(url+`/post/new/${userid}`,{
    method:'POST',
    body:post,
    headers: {
      Accept: "application/json",
      Authorization:`Bearer ${token}`
    },
  })
  .then(resp=>resp.json())
  .catch(err=>{console.log(err)})
}
export const getPosts=(token)=>{
  return fetch(url+"/posts",{
    method:'GET',
    headers: {
      Accept: "application/json",
     "Content-Type":"application/json",
      Authorization:`Bearer ${token}`
    },
  })
  .then(resp=>resp.json())
  .catch(err=>{console.log(err)})
}

export const getSinglePost=(postId)=>{
  return fetch( url+`/post/${postId}`,{
    method:'GET',

  })
  .then(resp=>resp.json())
  .catch(err=>{console.log(err)})
}
export const PostbyUser=(userId,token)=>{
  return fetch(url+`/post/by/${userId}`,{
    method:'GET',
    headers: {
      Accept: "application/json",
     "Content-Type":"application/json",
    },
  })
  .then(resp=>resp.json())
  .catch(err=>console.log(err))
}
export const removePost=(userId,token)=>{
  return fetch(url+`/post/${userId}`,{
    method:'DELETE',
    headers: {
      Accept: "application/json",
     "Content-Type":"application/json",
     Authorization:`Bearer ${token}`
    },
  })
  .then(resp=>resp.json())
  .catch(err=>console.log(err))
}
// edit post
export const updatePost=(id,token,post)=>{
  console.log('postdata',post)
  return fetch(url+`/post/update/${id}`,{
    method:'PUT',
    headers: {
      Accept: "application/json",
      Authorization:`Bearer ${token}`
    },
    body:post    
  }).then(resp=>resp.json())
  .catch(err=>console.log(err))
}
