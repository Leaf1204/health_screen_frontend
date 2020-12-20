import React from "react";
import logo from './logo.svg';
import Header from "./components/Header";
import Signup from "./pages/signup"
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
  const [gState, setGState] = React.useState({url: "http://localhost:5000"});

  return (
    <GlobalCtx.Provider value={{gState, setGState}}>
      <Router>
    <div className="App">
      <h1>Health Screener</h1>
      <Header/>
      <main>
       
        <Switch>
          <Route exact path="/" render={(rp => <h1>Home</h1>)}></Route>
          <Route path="/signup" render={(rp) => <Signup {...rp}/>}/>
          <Route path="/login" render={(rp => <h1>login</h1>)}></Route>
          <Route path="/dashboard" render={(rp => <h1>dashboard</h1>)}></Route>
        </Switch>
      
      </main>
    </div>
    </Router>
    </GlobalCtx.Provider>
  );
}

export default App;
