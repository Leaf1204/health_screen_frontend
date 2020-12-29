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
import { MDBContainer, MDBCard, MDBCardHeader, MDBCardBody, MDBTableBody, MDBTable, MDBTableHead, MDBIcon, MDBBtn } from "mdbreact";


const Dashboard = (props) => {

const emptyParent = {
    username: "",
    parentName: ""
    };

    const emptyStudent = {
    child_name: "",
    child_image: "",
    parent_user_name: ""
    };

    const emptyTeacher = {
    teacherName: "",
    username: "",
    students_ids: []
    };
    

  const { gState, setGState } = React.useContext(GlobalCtx);
  const { url, token } = gState;
  const [parents, setParents] = React.useState(null);
  const [students, setStudents] = React.useState(null);
  const [teachers, setTeachers] = React.useState(null);
  const [selectedParent, setSelectedParent] = React.useState(emptyParent);
  const [selectedStudent, setSelectedStudent] = React.useState(emptyStudent);
  const [selectedTeacher, setSelectedTeacher] = React.useState(emptyTeacher);

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

  ////// handleCreate to create Parent ///////

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

//////handleUpdate to update a parent when form is clicked

const handleUpdate = (parent, id) => {
fetch(url + "/parent/" + parent._id, {

  method: "put",
  headers: {
    "Content-Type": "application/json",
    Authorization: `bearer ${token}`
  },
  body: JSON.stringify(parent),
}).then((response) => response.json())
.then((data) => {
    // update.current.value="";
    getParents();
    });
};

///// deleteParent function to delete a parent from db

const handleDelete = (id) => {
fetch(url + "/parent/" + id, { 
    method: "delete",
    headers: {
        Authorization: `bearer ${token}`
    },
})
.then(response => response.json())
.then(data => {
    getParents()
})
}

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

//////handleUpdateStudent to update a student when form is clicked

const handleUpdateStudent = (student, id) => {
    fetch(url + "/student/" + student._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify(student),
    }).then((response) => response.json())
    .then((data) => {
        getStudents();
        });
    };

///// deleteStudent function to delete a student from db

const handleDeleteStudent = (id) => {
    fetch(url + "/student/" + id, { 
        method: "delete",
        headers: {
            Authorization: `bearer ${token}`
        },
    })
    .then(response => response.json())
    .then(data => {
        getStudents()
    })
    }
    

////// feacting teachers /////

const getTeachers = async() => {
    const response = await fetch(url + "/teacher/", {
        method: "get",
        headers: {
            Authorization: "bearer " + token
        }
    })
    const json = await response.json();
    setTeachers(json)
  }
  //have teacher data displayed on page
  React.useEffect (() => {
     getTeachers() 
  }, [])


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

    //////handleUpdate to update a parent when form is clicked

const handleUpdateTeacher = (teacher, id) => {
    fetch(url + "/teacher/" + teacher._id, {
    
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`
      },
      body: JSON.stringify(teacher),
    }).then((response) => response.json())
    .then((data) => {
        // update.current.value="";
        getTeachers();
        });
    };

///// deleteTeacher function to delete a teacher from db

const handleDeleteTeacher = (id) => {
    fetch(url + "/teacher/" + id, { 
        method: "delete",
        headers: {
            Authorization: `bearer ${token}`
        },
    })
    .then(response => response.json())
    .then(data => {
        getTeachers()
    })
    }
    

  return (
    <MDBContainer>
      <div>
          <h1>Admin Dashboard</h1>
          
          <main>
              <div>
              <Switch>
                <Route 
                  exact 
                  path="/"
                  render={(rp)=>(
                    <>
                   
                    <MDBCard>
                    <MDBCardHeader tag="h4" className="text-center font-weight-bold text-uppercase py-4 m-2 p-2">
                    <MDBIcon icon="users p-2" />Parents
                    </MDBCardHeader>
                    <MDBCardBody>
                    <MDBTable>
                        <MDBTableHead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>User Name</th>
                                {/* <th>Kids</th> */}
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
                                {/* <td>todo</td> */}
                                <td><Link to={`/edit`} onClick={()=>setSelectedParent(parent)}><MDBIcon far icon="edit" /></Link></td>
                                <td><Link onClick={() => handleDelete(parent._id)}><MDBIcon far icon="trash-alt" /></Link></td>
                                </tr>
                            )) : null }
                        </MDBTableBody>
                        </MDBTable>
                        <Link to="/create" params={{label:'created'}}>
                        <MDBBtn outline color="#e8eaf6 indigo lighten-5">
                            add parent <MDBIcon icon="plus" className="mr-1" />
                        </MDBBtn>
                        </Link>
                        </MDBCardBody>
                        </MDBCard>
                            <MDBCard className="my-5">
                                <MDBCardHeader tag="h4" className="text-center font-weight-bold text-uppercase py-4 m-2 p-2">
                                <MDBIcon icon="child p-2" />students
                                </MDBCardHeader>
                     <MDBCardBody>
                        <MDBTable>
                        <MDBTableHead>
                        <tr>
                                <th>Student Id</th>
                                <th>Student Name</th>
                                <th>Student Picture</th>
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
                                    <td>{student.child_name}</td>
                                    <td>{student.child_image}</td>
                                    <td>{student.parent_user_name}</td>
                                    <td><Link to={`/studentEdit`} onClick={()=>setSelectedStudent(student)}><MDBIcon far icon="edit" /></Link></td>
                                    <td><Link onClick={() => handleDeleteStudent(student._id)}><MDBIcon far icon="trash-alt" /></Link></td>
                                    </tr>
                                 )) : null 
                                }
                         </MDBTableBody>
                        </MDBTable>
                                    <Link to="/createStudent">
                                        <MDBBtn outline color="#e8eaf6 indigo lighten-5">
                                        add student <MDBIcon icon="plus" className="mr-1" />
                                        </MDBBtn>
                                    </Link>  
                        </MDBCardBody>
                        </MDBCard>
                        <MDBCard>
                                <MDBCardHeader tag="h4" className="text-center font-weight-bold text-uppercase py-4 m-2 p-2">
                                <MDBIcon icon="chalkboard-teacher p-2" />Teachers
                                </MDBCardHeader>
                     <MDBCardBody>
                        <MDBTable>
                        <MDBTableHead>
                            <tr>
                                <th>Teacher Name</th>
                                <th>username</th>
                                <th>class list</th>
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
                                        <td>{teacher.names.join(",")}</td>
                                        <td><Link to={`/teacherEdit`} onClick={()=>setSelectedTeacher(teacher)}><MDBIcon far icon="edit" /></Link></td>
                                        <td><Link onClick={() => handleDeleteTeacher(teacher._id)}><MDBIcon far icon="trash-alt" /></Link></td>
                                    </tr>
                                )): null
                            }

                        </MDBTableBody>
                        </MDBTable>
                                    <Link to="/createTeacher">
                                        <MDBBtn outline color="#e8eaf6 indigo lighten-5">
                                            add teacher <MDBIcon icon="plus" className="mr-1" />
                                         </MDBBtn>
                                    </Link>  
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
                        label="create"
                        parent={emptyParent}
                        handleSubmit={handleCreate}
                    /> 
                  )}/>
                  <Route 
                  exact 
                  path="/edit"
                  render={(rp)=>(
                    <ParentForm
                        {...rp}
                        label="edit"
                        parent={selectedParent}
                        handleSubmit={handleUpdate}
                    /> 
                  )}/>
                  <Route 
                  exact 
                  path="/createStudent"
                  render={(rp)=>(
                    <StudentForm
                        {...rp}
                        student={emptyStudent}
                        parents={parents}
                        handleSubmit={handleCreateStudent}
                    /> 
                  )}/>
                  <Route 
                  exact 
                  path="/studentEdit"
                  render={(rp)=>(
                    <StudentForm
                        {...rp}
                        label="edit"
                        student={selectedStudent}
                        parents={parents}
                        handleSubmit={handleUpdateStudent}
                    /> 
                  )}/>
                  <Route 
                  exact 
                  path="/createTeacher"
                  render={(rp)=>(
                    <TeacherForm
                        {...rp}
                        teacher={emptyTeacher}
                        students={students}
                        handleSubmit={handleCreateTeacher}
                    /> 
                  )}/>
                  <Route 
                  exact 
                  path="/teacherEdit"
                  render={(rp)=>(
                    <TeacherForm
                        {...rp}
                        label="edit"
                        teacher={selectedTeacher}
                        //student={selectedStudent}
                        students={students}
                        handleSubmit={handleUpdateTeacher}
                    /> 
                  )}/>
              </Switch>
              </div> 
          </main>

      </div>
    </MDBContainer>
  );
};

  export default Dashboard;

