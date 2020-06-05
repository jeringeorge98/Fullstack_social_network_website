export const createPost=(token,userid,post)=>{
  return fetch(`http://localhost:5000/post/new/${userid}`,{
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
  return fetch(`http://localhost:5000/posts`,{
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
  return fetch(`http://localhost:5000/post/${postId}`,{
    method:'GET',

  })
  .then(resp=>resp.json())
  .catch(err=>{console.log(err)})
}
export const PostbyUser=(userId,token)=>{
  return fetch(`http://localhost:5000/post/by/${userId}`,{
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
  return fetch(`http://localhost:5000/post/${userId}`,{
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
  return fetch(`http://localhost:5000/post/update/${id}`,{
    method:'PUT',
    headers: {
      Accept: "application/json",
      Authorization:`Bearer ${token}`
    },
    body:post    
  }).then(resp=>resp.json())
  .catch(err=>console.log(err))
}
