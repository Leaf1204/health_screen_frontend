import React from "react";
import {GlobalCtx} from "../App";

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
            console.log(data);
            setForm(blankForm);
            props.history.push("/login");
        })

     }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text"  placeholder="username" name="username" value={form.username} onChange={handleChange}></input>
                <input type="password" placehold="password" name="password" value={form.password} onChange={handleChange}></input>
                <input type="submit" value="signup" />

            </form>
        </div>
    )

}

export default Signup