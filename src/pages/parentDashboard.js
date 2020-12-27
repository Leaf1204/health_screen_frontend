import React from "react";
import { GlobalCtx } from "../App";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import { MDBContainer, MDBCard, MDBCardHeader, MDBCardBody, MDBTableBody, MDBTable, MDBTableHead } from "mdbreact";
import HealthForm from "../components/forms/healthForm";
const ParentDashboard = (props) => {
  
    return (
        <MDBContainer>
        <h1>ParentDashoard</h1>
    <div>
        <Link to="/healthForm" params={{label: "check-in" }}>
            <button>health form</button>
        </Link>
        <Route 
                  exact 
                  path="/healthForm"
                  render={(rp)=>(
                    <HealthForm
                        {...rp}
                        label="check in"
                    /> 
                  )}/>
    </div>
        </MDBContainer>
    );
}

export default ParentDashboard;

