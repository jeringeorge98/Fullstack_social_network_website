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