import React from "react";
import logo from './logo.svg';
import Header from "./components/Header";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import ParentForm from "./components/forms/parentForm"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

//global context
export const GlobalCtx = React.createContext(null)


//global state property



function App() {
  const [gState, setGState] = React.useState({
    url: "http://localhost:5000",
    token: null,
  });


  ///check if logged in
  React.useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem("token"));
    console.log(token);
    if (token) {
      setGState({ ...gState, token: token.token });
    }
  }, []);



  return (
    <GlobalCtx.Provider value={{gState, setGState}}>
      <Router>
      <div className="App">
      <Link to="/"><h1>Health Screener</h1></Link>
      <Header/>
      <main>
       
        <Switch>
          <Route exact path="/" render={(rp => gState.token ? <Dashboard/> : <Home/>)}></Route>
          <Route exact path="/create" render={(rp => gState.token ? <Dashboard/> : <Home/>)}></Route>
          <Route exact path="/createStudent" render={(rp => gState.token ? <Dashboard/> : <Home/>)}></Route>
          <Route path="/signup" render={(rp) => <Signup {...rp}/>}/>
          <Route path="/login" render={(rp) => <Login {...rp}/>}/>
          {/* <Route path="/dashboard" render={(rp => <h1>dashboard</h1>)}></Route> */}
        </Switch>
      
      </main>
    </div>
    </Router>
    </GlobalCtx.Provider>
  );
}

export default App;
