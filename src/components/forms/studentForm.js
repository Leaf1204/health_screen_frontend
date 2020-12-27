import React from "react";
import { GlobalCtx } from "../../App";

const StudentForm = (props) => {
  //state for the form

  // todo : extract .parents property, then use it to build a select element (each value is an option)
  const [formData, setFormData] = React.useState(props.student);
  const [parents] = React.useState(props.parents);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    props.handleSubmit(formData); // Submit to Parents desired function
    props.history.push("/"); //Push back to display page
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  

  return (
      <>
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Child Name" name="child_name" value={formData.child_name} onChange={handleChange} ></input>
          <input type="img" placeholder="Child Image" name="child_image" value={formData.child_image} onChange={handleChange} ></input>
          <select name="parent_user_name" onChange={handleChange} >
            {
              parents.map((parent)=>{
                return <option key={parent._id} value={parent._id}>{parent.parentName}</option>
              })
            }
          </select>
          <input type="submit" value={props.label} />
      </form>
      </>
  );
};

export default StudentForm;