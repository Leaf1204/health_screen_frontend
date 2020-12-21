import React from "react";
import { GlobalCtx } from "../App";

const Dashboard = (props) => {
  const { gState, setGState } = React.useContext(GlobalCtx);
  const { url, token } = gState;
  const [parents, setParents] = React.useState(null);

  const getParents = async() => {
    const response = await fetch(url + "/parent/", {
        method: "get",
        headers: {
            Authorization: "bearer " + token
        }
    })
    const json = await response.json()
    setParents(json)
  }

  //have data displayed on page
  React.useEffect (() => {
     getParents() 
  }, [])

  const input = React.useRef(null)
  
  const handleClick = (event) => {
      console.log(input);
    const parent = input.current.value
        fetch(url + "/parent/", { 
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`
            },
            body: JSON.stringify({parent})
        })
        .then(response => response.json())
        .then(data => {
            input.current.value = "";
            getParents()
        })
    
        // const handleSubmit = (event) => {
        //     event.preventDefault(); // Prevent Form from Refreshing
        //     props.handleSubmit(formData); // Submit to Parents desired function
        //     props.history.push("/"); //Push back to display page
        //   };
        
     
  }
  return (
      <div>
          <h1>Dashboard</h1>
          <h2>Add New Parent</h2>
          <form>
          {/* <form onSubmit={handleSubmit}> */}
              <input type="text" placeholder="parent name" name="parentName" ref={input}></input>
              <input type="text" placeholder="user name" name="username" ref={input}></input>
              <input type="password" placeholder="password" name="password" ref={input}></input>
              <input type="submit" value="create parent"></input>
          </form>
          
          {/* <button>Create Parent</button> */}
          <h2>Parents</h2>
          <ul>
          {parents ? parents.map((parent) => (
              <li key={parent._id}>
                {parent.parentName}
                </li>
          )) : null }
          </ul>
      </div>
  );
};
  
  export default Dashboard;