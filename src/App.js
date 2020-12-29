import React from "react";
import logo from './logo.svg';
import Header from "./components/Header";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import TeacherDashboard from "./pages/teacherDashboard";
import ParentDashboard from "./pages/parentDashboard";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import { MDBContainer } from "mdbreact";

//global context
export const GlobalCtx = React.createContext(null)


//global state property



function App() {
  const [gState, setGState] = React.useState({
    // url: "https://covidhealthscreen.herokuapp.com",
    url : "http://localhost:5000",
    token: null,
  });


  ///check if logged in
  React.useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    //console.log(token);
    if (token) {
      setGState({ ...gState, token: token.token });
    }
  }, []);



  return (
    <GlobalCtx.Provider value={{gState, setGState}}>
      <Router>
  
      <Header/>
      <MDBContainer>
      <main>
       
        <Switch>
          <Route exact path="/" render={(rp => gState.token ? <Dashboard/> : <Home/>)}></Route>
          <Route exact path="/teacherDashboard" render={(rp => gState.token ? <TeacherDashboard/> : <Home/>)}></Route>
          <Route exact path="/parentDashboard" render={(rp => gState.token ? <ParentDashboard/> : <Home/>)}></Route>
          <Route exact path="/healthForm" render={(rp => gState.token ? <ParentDashboard/> : <Home/>)}></Route>
          <Route exact path="/create" render={(rp => gState.token ? <Dashboard/> : <Home/>)}></Route>
          <Route exact path="/edit" render={(rp => gState.token ? <Dashboard/> : <Home/>)}></Route>
          <Route exact path="/createStudent" render={(rp => gState.token ? <Dashboard/> : <Home/>)}></Route>
          <Route exact path="/studentEdit" render={(rp => gState.token ? <Dashboard/> : <Home/>)}></Route>
          <Route exact path="/createTeacher" render={(rp => gState.token ? <Dashboard/> : <Home/>)}></Route>
          <Route exact path="/teacherEdit" render={(rp => gState.token ? <Dashboard/> : <Home/>)}></Route>
          <Route path="/signup" render={(rp) => <Signup {...rp}/>}/>
          <Route path="/login" render={(rp) => <Login {...rp}/>}/>
        </Switch>
      
      </main>
      </MDBContainer>
    </Router>
    </GlobalCtx.Provider>
  );
}

export default App;
