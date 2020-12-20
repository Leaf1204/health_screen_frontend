import React from "react";
import {GlobalCtx} from "../App";

const Signup = (props) => {

    const {gState, setGState } = React.useContext(GlobalCtx)
    const {url} = gState

    const [form, setForm] = React.useState({
        username: "",
        password: ""
    })

    //handle change
     const handleChange = (event) => {
       setForm({...form, [event.target.name]: event.target.value})
     }


    return (
        <div>
            <form>
                <input type="text"  placeholder="username" name="username" value={form.username} onChange={handleChange}></input>
                <input type="password" placehold="password" name="password" value={form.password} onChange={handleChange}></input>
                <input type="sumbit" value="signup"></input>
            </form>
        </div>
    )

}

export default Signup