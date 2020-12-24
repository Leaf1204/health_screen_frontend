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
import StudentForm from "../components/forms/studentForm";
import TeacherForm from "../components/forms/teacherForm";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBTableBody, MDBTable, MDBTableHead } from "mdbreact";


const Dashboard = (props) => {
  const { gState, setGState } = React.useContext(GlobalCtx);
  const { url, token } = gState;
  const [parents, setParents] = React.useState(null);
  const [students, setStudents] = React.useState(null);
  const [teachers, setTeachers] = React.useState(null);

  const emptyParent = {
    username: "",
    parentName: ""
  };

  const emptystudents = {
    child_name: "",
    child_image: "",
    parent_user_name: ""
  };

  const emptyTeachers = {
    teacherName: "",
    username: "",
    students_ids: []
  };

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
////// feacting teachers /////

const getTeachers = async() => {
    const response = await fetch(url + "/teacher/", {
        method: "get",
        headers: {
            Authorization: "bearer " + token
        }
    })
    const json = await response.json()
    setTeachers(json)
  }
  //have teacher data displayed on page
  React.useEffect (() => {
     getTeachers() 
  }, [])

  ////// create Parent ///////

  const handleCreate = (parent) => {
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


/////// create Teacher /////////
const handleCreateTeacher = (teacher) => {
      fetch(url + "/teacher/", { 
          method: "post",
          headers: {
              "Content-Type": "application/json",
              Authorization: `bearer ${token}`
          },
          body: JSON.stringify(teacher)
      })
      .then(response => response.json())
      .then(data => {
          getTeachers()
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
                        <h2>Parents</h2>
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
                            <MDBCard>
                                <MDBCardHeader tag="h3" className="text-center font-weight-bold text-uppercase py-4">
                                    <h2>students</h2>
                                    <Link to="/createStudent">
                                    <button>Add student</button>
                                    </Link>  
                                </MDBCardHeader>
                     <MDBCardBody>
                        <MDBTable>
                        <MDBTableHead>
                        <tr>
                                <th>Student Id</th>
                                <th>Student Name</th>
                                <th>Parent User Name</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {
                                    students ? students.map((student) => (
                                    <tr> 
                                    <td>{student._id}</td>
                                    <td> {student.child_name}</td>
                                    <td>{student.parent_user_name}</td>
                                    <td>Edit</td>
                                    <td>Delete</td>
                                    </tr>
                                 )) : null 
                                }
                         </MDBTableBody>
                        </MDBTable>
                        </MDBCardBody>
                        </MDBCard>
                        <MDBCard>
                                <MDBCardHeader tag="h3" className="text-center font-weight-bold text-uppercase py-4">
                                    <h2>Teachers</h2>
                                    <Link to="/createTeacher">
                                    <button>Add teacher</button>
                                    </Link>  
                                </MDBCardHeader>
                     <MDBCardBody>
                        <MDBTable>
                        <MDBTableHead>
                            <tr>
                                <th>Teacher Name</th>
                                <th>username</th>
                                <th>class list: students_ids</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                teachers ? teachers.map((teacher) => (
                                    <tr>
                                        <td>{teacher.teacherName}</td>
                                        <td>{teacher.username}</td>
                                    </tr>
                                )): null
                            }

                        </MDBTableBody>
                        </MDBTable>
                        </MDBCardBody>
                        </MDBCard>
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
                  <Route 
                  exact 
                  path="/createTeacher"
                  render={(rp)=>(
                    <TeacherForm
                        {...rp}
                        teacher={emptyTeachers}
                        students={students}
                        handleSubmit={handleCreateTeacher}
                    /> 
                  )}/>
              </Switch>
              </div> 
          </main>

      </div>
  );
};

  export default Dashboard;