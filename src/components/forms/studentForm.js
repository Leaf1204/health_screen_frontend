import React from "react";


const StudentForm = (props) => {
  //state for the form

  // todo : extract .parents property, then use it to build a select element (each value is an option)
  const [formData, setFormData] = React.useState(props.student);


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
            <option value="parent_id">Parent Name 1</option>
            <option value="parent_id">Parent Name 2</option>
          </select>
          {/* <input type="text" placeholder="Parent User name" name="parent_user_name" value={formData.parent_user_name} onChange={handleChange} ></input> */}
          <input type="submit" value="Create Student" />
      </form>
      </>
  );
};

export default StudentForm;