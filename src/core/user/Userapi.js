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