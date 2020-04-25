export const isAuthenticate=()=>{
    if(typeof window === undefined){
      return false
    }

   if(localStorage.getItem("jwt"))
   return  JSON.parse(localStorage.getItem("jwt"))
   else 
   return false

  }
  export const isAuthenticateUser=()=>{
    if(typeof window === undefined){
      return false
    }

   if(localStorage.getItem("jwt"))
   return  JSON.parse(localStorage.getItem("user"))
   else 
   return false

  }

  // get singleuser
  export const getUser=(id,token)=>{

   return fetch(`http://localhost:5000/user/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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