import React from "react";
import { GlobalCtx } from "../App";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import ParentForm from "../components/forms/parentForm";
import StudentForm from "../components/forms/studentForm"


const Dashboard = (props) => {
  const { gState, setGState } = React.useContext(GlobalCtx);
  const { url, token } = gState;
  const [parents, setParents] = React.useState(null);
  const [students, setStudents] = React.useState(null);

  const emptyParent = {
    child_name: "",
    child_image: "",
    parent_user_name: ""
  };

  const emptystudents = {

  }
  //fetching parents 
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

  //have Parent data displayed on page
  React.useEffect (() => {
    getParents() 
 }, [])

  //fetching students 
  const getStudents = async() => {
    const response = await fetch(url + "/student/", {
        method: "get",
        headers: {
            Authorization: "bearer " + token
        }
    })
    const json = await response.json()
    setStudents(json)
  }
  //have student data displayed on page
  React.useEffect (() => {
     getStudents() 
  }, [])

  ////// create Parent ///////

  const handleCreate = (parent) => {
      console.log(JSON.stringify(parent))
        fetch(url + "/parent/", { 
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`
            },
            body: JSON.stringify(parent)
        })
        .then(response => response.json())
        .then(data => {
            getParents()
        })
//////////// create student //////////

// const handleCreateStudent = (student) => {
//     console.log(JSON.stringify(student))
//       fetch(url + "/student/", { 
//           method: "post",
//           headers: {
//               "Content-Type": "application/json",
//               Authorization: `bearer ${token}`
//           },
//           body: JSON.stringify(student)
//       })
//       .then(response => response.json())
//       .then(data => {
//           getStudents()
//       })

  }
  return (
      <div>
          <h1>Dashboard</h1>
          <h2>Parents</h2>
          <Link to="/create">
              <button>Add Parent</button>
          </Link>
          {/* <h2>students</h2>
          <Link to="/create">
              <button>Add student</button>
          </Link> */}
          <main>
              <div className="parentContainer">
              <Switch>
                <Route 
                  exact 
                  path="/"
                  render={(rp)=>(
                    <ul>
                    {parents ? parents.map((parent) => (
                        <li key={parent._id}>
                          {parent.parentName}
                          </li>
                    )) : null }
                    </ul>
                  )}/>
                  <Route 
                  exact 
                  path="/create"
                  render={(rp)=>(
                    <ParentForm
                        {...rp}
                        parent={emptyParent}
                        handleSubmit={handleCreate}
                    /> 
                  )}/>
              </Switch>
              </div>
             {/* <div className="studentContainer">       
              <Switch>
                <Route 
                  exact 
                  path="/"
                  render={(rp)=>(
                    <ul>
                    {students ? students.map((student) => (
                        <li key={student._id}>
                          {student.child_name}
                          </li>
                    )) : null }
                    </ul>
                  )}/>
                  <Route 
                  exact 
                  path="/create"
                  render={(rp)=>(
                    <StudentForm
                        {...rp}
                        parent={emptystudents}
                        handleSubmit={handleCreateStudent}
                    /> 
                  )}/>
              </Switch>
              </div>   */}
          </main>

      </div>
  );
};

  export default Dashboard;