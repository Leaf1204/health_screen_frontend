import React from "react";


const ParentForm = (props) => {
  //state for the form

  const [formData, setFormData] = React.useState(props.parent);


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
          <input type="text" placeholder="Parent Name" name="parentName" value={formData.parentName} onChange={handleChange} ></input>
          <input type="text" placeholder="username" name="username" value={formData.username} onChange={handleChange} ></input>
          <input type="password" placeholder="password" name="password" value={formData.password} onChange={handleChange} ></input>
          <input type="submit" value="Create Parent" />
      </form>
      </>
  );
};

export default ParentForm;