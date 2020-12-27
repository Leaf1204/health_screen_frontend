import React from "react";
import { MDBInput } from "mdbreact";


const HealthForm = (props) => {
  //state for the form
  const [formData, setFormData] = React.useState();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    props.handleSubmit(formData); // Submit to Parents desired function
    props.history.push("/parentDashboard"); //Push back to display page
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
      <>
        <form onSubmit={handleSubmit}>
            {/* <label>
                Date
            <input type="text" name="dateOf" value={formData.dateOf} onChange={handleChange}></input>
            </label>
            <br/>
            <label>
                student id
            <input type="text" name="student_id" value={formData.student_id}></input>
            </label>
            <br/> */}
            <label>
               1. Does your child currently have a temperature of 100.4 or greater, feel feverish or have chills?
            <input type="radio" value="Yes" name="have_fever" onChange={handleChange}></input>Yes
            <input type="radio" value="No" name="have_fever" onChange={handleChange}></input>No
            </label>
            <br/>
            <label>
                2. Does your child currently have a new or unexplained persistent cough?
                <input type="radio" value="Yes" name="have_cough" onChange={handleChange}></input>Yes
                <input type="radio" value="No" name="have_cough" onChange={handleChange}></input>No
            </label>
            <br/>
            <label>
                3. Does your child currently have difficulty breathing or shortness of breath that is new or a change in a usual symptom?
                <input type="radio" value="Yes" name="have_difficulty_breathing" onChange={handleChange}></input>Yes
                <input type="radio" value="No" name="have_difficulty_breathing" onChange={handleChange}></input>No
            </label>
            <br/>
            <label>
                4. Has your child experienced a loss of taste or smell in the past 24hrs (1 day)?
                <input type="radio" value="Yes" name="have_loss_of_taste" onChange={handleChange}></input>Yes
                <input type="radio" value="No" name="have_loss_of_taste" onChange={handleChange}></input>No
            </label>
            <br/>
            <label>
                5. Is your child currently experiencing any of the following symptoms that are new or are a change in usual symptoms?
                <input type="radio" value="Yes" name="have_new_symptoms" onChange={handleChange}></input>Yes
                <input type="radio" value="No" name="have_new_symptoms" onChange={handleChange}></input>No
            </label>
            <br/>
            <label>
                6. In the last 14 days has your child had close contact with anyone who has been diagnosed or presumed to have COVID 19?
                <input type="radio" value="Yes" name="had_contact_with_covid" onChange={handleChange}></input>Yes
                <input type="radio" value="No" name="had_contact_with_covid" onChange={handleChange}></input>No
            </label>
            <input type="submit" value={props.label} />
        </form>
      </>
  );
};

export default HealthForm;