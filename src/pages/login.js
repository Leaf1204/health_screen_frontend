import React from "react";
import jwt_decode from "jwt-decode";
import {GlobalCtx} from "../App";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

const Login = (props) => {

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

        fetch(`${url}/auth/login`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        })
        .then(response => response.json())
        .then(data => {
            const decodedToken = jwt_decode(data.token);

            window.localStorage.setItem("token", JSON.stringify(data))
            window.localStorage.setItem("username", decodedToken.username);

            setGState({...gState, token: data.token, username: decodedToken.username});
            setForm(blankForm);

            if(decodedToken.typeOf == "admin"){
                props.history.push("/");
            }else if(decodedToken.typeOf == "teacher"){
                props.history.push("/teacherDashboard");
            }else if(decodedToken.typeOf == "parent"){
                props.history.push("/parentDashboard");
            }
        })

     }

    return (
     
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="4">
                    <form onSubmit={handleSubmit}>
                        <p className="h5 text-center mb-4 my-5">Sign in</p>
                        <div className="grey-text">
                        <MDBInput label="username" icon="envelope" name= "username" value={form.username} onChange={handleChange}></MDBInput>
                        <MDBInput label="Type your password" icon="lock" name="password" value={form.password} onChange={handleChange} type="password"></MDBInput>
                        </div>
                        <div className="text-center">
                            <MDBBtn type="submit">Login</MDBBtn>
                            </div>
                    </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
      
    )

}

export default Login