import React from "react";
import {GlobalCtx} from "../App";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

const Signup = (props) => {

    const {gState, setGState } = React.useContext(GlobalCtx);
    const {url} = gState;

    const blankForm = {
        username: "",
        password: ""
    };

    const [form, setForm] = React.useState(blankForm);

    //handle change
     const handleChange = (event) => {
       setForm({...form, [event.target.name]: event.target.value})
     }

     //handle submit 

     const handleSubmit = (event) => {
         event.preventDefault()
        const {username, password} = form; 

        fetch(`${url}/auth/signup`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        })
        .then(response => response.json())
        .then(data => {
            setForm(blankForm);
            props.history.push("/login");
        })

     }

    return (

        <MDBContainer>
        <MDBRow>
            <MDBCol md="6">
            <form onSubmit={handleSubmit}>
                <p className="h5 text-center mb-4 my-5">Sign in</p>
                <div className="grey-text">
                <MDBInput label="username" icon="envelope" name= "username" value={form.username} onChange={handleChange}></MDBInput>
                <MDBInput label="Type your password" icon="lock" name="password" value={form.password} onChange={handleChange} type="password"></MDBInput>
                </div>
                <div className="text-center">
                    <MDBBtn color="#c5cae9 indigo lighten-4" type="submit">SignUp</MDBBtn>
                    </div>
            </form>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
    )
}

export default Signup