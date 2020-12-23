import React from "react";
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
            console.log(data);
            window.localStorage.setItem("token", JSON.stringify(data))
            setGState({...gState, token: data.token});
            setForm(blankForm);
            // todo : check typeOf on token and redirect to correct page
            // todo: look up https://www.npmjs.com/package/jwt-decode

            // admin route
            props.history.push("/");
            // teacher route

            // parent route
        })

     }

    return (
        <div>
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6">
                    <form onSubmit={handleSubmit}>
                        <p className="h5 text-center mb-4">Sign in</p>
                        <div className="grey-text">
                        <MDBInput label="username" icon="envelope" name= "username" value={form.username} onChange={handleChange}></MDBInput>
                        <MDBInput label="Type your password" icon="lock" name="password" value={form.password} onChange={handleChange}></MDBInput>
                        </div>
                        <div className="text-center">
                            <MDBBtn type="submit">Login</MDBBtn>
                            </div>
                    </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    )

}

export default Login