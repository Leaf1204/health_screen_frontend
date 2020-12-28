import React from "react";
import { MDBContainer, MDBInput, MDBIcon } from "mdbreact";


const HealthForm = (props) => {
  //state for the form
  const [formData, setFormData] = React.useState({"student_id":props.kid._id, "dateOf" : props.dateOf});
  const [kid] = React.useState(props.kid);

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
      <h1><MDBIcon icon="laptop-medical m-3" />Daily Health Check Form For <b>{`${kid.child_name}`}</b></h1>
            <p>Before arriving at school you must review health screening       questions for your student(s) and complete the Student COVID Screening form for school. If you answer <b>YES</b> to any screening question you must stay home and report the absence due to the screening or other illness.</p>
            <p>These questions refer only to new symptoms or a change in usual symptoms. You do not need to stay home for usual symptoms experienced due to a chronic condition unless they are worse than usual.</p>
            
        <form onSubmit={handleSubmit}>            
            <label>
                <b> 1. Does your child currently have a temperature of 100.4 or greater, feel feverish or have chills?</b>   
               <br/>
            <input type="radio" value="true" name="have_fever" onChange={handleChange}></input>Yes
            <br/>
            <input type="radio" value="false" name="have_fever" onChange={handleChange}></input>No
            </label>
            <br/>
            <label>
                <b>2. Does your child currently have a new or unexplained persistent cough?</b>
                <br/>
                <input type="radio" value="true" name="have_cough" onChange={handleChange}></input>Yes
                <br/>
                <input type="radio" value="false" name="have_cough" onChange={handleChange}></input>No
            </label>
            <br/>
            <label>
                <b>3. Does your child currently have difficulty breathing or shortness of breath that is new or a change in a usual symptom?</b>
                <br/>
                <input type="radio" value="true" name="have_difficulty_breathing" onChange={handleChange}></input>Yes
                <br/>
                <input type="radio" value="false" name="have_difficulty_breathing" onChange={handleChange}></input>No
            </label>
            <br/>
            <label>
                <b> 4. Has your child experienced a loss of taste or smell in the past 24hrs (1 day)?</b>
                <br/>
                <input type="radio" value="true" name="have_loss_of_taste" onChange={handleChange}></input>Yes
                <br/>
                <input type="radio" value="false" name="have_loss_of_taste" onChange={handleChange}></input>No
            </label>
            <br/>
            <label>
                <b>5. Is your child currently experiencing any of the following symptoms that are new or are a change in usual symptoms?
                <br/>
                Sore Throat; Fatigue; Diarrhea; Headache; Congestion/Runny Nose; Muscle Aches; Nausea/Vomiting</b>
                <br/>
                <input type="radio" value="true" name="have_new_symptoms" onChange={handleChange}></input>Yes
                <br/>
                <input type="radio" value="false" name="have_new_symptoms" onChange={handleChange}></input>No
            </label>
            <br/>
            <label>
                <b>6. In the last 14 days has your child had close contact with anyone who has been diagnosed or presumed to have COVID 19?</b>
                <br/>
                <input type="radio" value="true" name="had_contact_with_covid" onChange={handleChange}></input>Yes
                <br/>
                <input type="radio" value="false" name="had_contact_with_covid" onChange={handleChange}></input>No
            </label>
            <input type="submit" value={props.label} />
        </form>
      </>
  );
};

export default HealthForm;