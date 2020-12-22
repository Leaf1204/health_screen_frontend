import React from "react";
import {GlobalCtx} from "../App";

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
            <form onSubmit={handleSubmit}>
                <input type="text"  placeholder="username" name="username" value={form.username} onChange={handleChange}></input>
                <input type="password" placehold="password" name="password" value={form.password} onChange={handleChange}></input>
                <input type="submit" value="login" />
            </form>
        </div>
    )

}

export default Login