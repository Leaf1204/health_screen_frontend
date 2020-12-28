import React from "react";
import { GlobalCtx } from "../App";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import { MDBContainer } from "mdbreact";
import HealthForm from "../components/forms/healthForm";
const ParentDashboard = (props) => {
  
    const { gState, setGState } = React.useContext(GlobalCtx);
    const [kids, setKids] = React.useState([]);
    const { url, token, username } = gState;
    const [selectedKid, setSelectedKid] = React.useState({_id:""});

    //fetching students 
    const getKids = async() => {
        const response = await fetch(url + `/student/${username}`, {
            method: "get",
            headers: {
                Authorization: "bearer " + token
            }
        })
        const json = await response.json()
        setKids(json)
    }

    const getTodaysDate = () =>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;

        return today;
    }

    //have Parent data displayed on page
    React.useEffect (() => {
        getKids() 
    }, [])

    const handleCreate = (parent) => {
        fetch(url + "/healthForm/", { 
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `bearer ${token}`
            },
            body: JSON.stringify(parent)
        })
        .then(response => response.json())
        .then(data => {
            getKids()
        })
    
    }

    return (
        <MDBContainer>
        <h1>ParentDashoard</h1>
        <h5>Today is {`${getTodaysDate()}`}</h5>
        <p>Please complete a health form for each child</p>
            {
                kids? kids.map((kid)=>{
                    return  <Link to="/healthForm" params={{label: "check-in" }}onClick={()=>setSelectedKid(kid)}><button>Complete health form for <b>{`${kid.child_name}`}</b></button></Link>
                }): null
            }
            <Route 
                    exact 
                    path="/healthForm"
                    render={(rp)=>(
                        <HealthForm
                            {...rp}
                            kid={selectedKid}
                            dateOf={getTodaysDate()}
                            handleSubmit={handleCreate}
                            label="check in"
                        /> 
                    )}/>
        </MDBContainer>
    );
}

export default ParentDashboard;

