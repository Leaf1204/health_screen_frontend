import React from "react";
import { GlobalCtx } from "../App";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import ParentForm from "../components/forms/parentForm";
import StudentForm from "../components/forms/studentForm"
import { MDBCard, MDBCardHeader, MDBCardBody, MDBTableEditable, MDBTableBody, MDBTable, MDBTableHead } from "mdbreact";


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
    
    }
//////////// create student //////////

const handleCreateStudent = (student) => {
    console.log(JSON.stringify(student))
      fetch(url + "/student/", { 
          method: "post",
          headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`
          },
          body: JSON.stringify(student)
      })
      .then(response => response.json())
      .then(data => {
          getStudents()
      })
    }

  return (
      <div>
          <h1>Dashboard</h1>
          
          <main>
              <div>
              <Switch>
                <Route 
                  exact 
                  path="/"
                  render={(rp)=>(
                    <>
                    <MDBCard>
                    <MDBCardHeader tag="h3" className="text-center font-weight-bold text-uppercase py-4">
                        Parents
                        <Link to="/create">
                        <button>Add Parent</button>
                    </Link>
                    </MDBCardHeader>
                    <MDBCardBody>
                

                    <MDBTable>
                        <MDBTableHead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>User Name</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                parents ? parents.map((parent) => (
                                <tr>
                                <td>{parent._id}</td>
                                <td >{parent.parentName}</td>
                                <td>{parent.username}</td>
                                <td>Edit</td>
                                <td>Delete</td>
                                </tr>
                            )) : null }
                        </MDBTableBody>
                        </MDBTable>
                        </MDBCardBody>
                        </MDBCard>
                    <h2>students</h2>
                    <Link to="/createStudent">
                        <button>Add student</button>
                    </Link>  
                    <table>
                        <thead><td>Name</td></thead>
                    <tr>
                    {students ? students.map((student) => (
                        <tr key={student._id}>
                        {student.child_name}
                        </tr>
                    )) : null }
                    </tr>
                    </table>
                    {/* <MDBTable>
      <MDBTableHead>
        <tr>
          <th>#</th>
          <th>First</th>
          <th>Last</th>
          <th>Handle</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </MDBTableBody>
    </MDBTable> */}

                    </>
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
                  <Route 
                  exact 
                  path="/createStudent"
                  render={(rp)=>(
                    <StudentForm
                        {...rp}
                        student={emptystudents}
                        parents={parents}
                        handleSubmit={handleCreateStudent}
                    /> 
                  )}/>
              </Switch>
              </div> 
          </main>

      </div>
  );
};

  export default Dashboard;