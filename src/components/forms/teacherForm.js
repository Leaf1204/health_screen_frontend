import React from "react";
import MultiSelect from "react-multi-select-component";
import { MDBInput } from "mdbreact";

const TeacherForm = (props) => {
  //state for the form

  // todo : extract .parents property, then use it to build a select element (each value is an option)
  const [formData, setFormData] = React.useState(props.teacher);
  const [students] = React.useState(props.students);
  const [selected, setSelected] = React.useState([]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    let selectedIds = "";
    if(selected != undefined && selectedIds != null){
      selectedIds = selected.map((student)=>{
        return student.value;
      }).join(",");
    }
    formData.students_ids = selectedIds;
    props.handleSubmit(formData); // Submit to Parents desired function
    props.history.push("/"); //Push back to display page
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const transformStudents = () =>{
      const options = [];
      students.map((student)=>{
        options.push({
            value: student._id,
            label: student.child_name
        })
      });

      return options;
  }


  return (
      <>
      <MDBInput label="Create/Edit Teacher" />
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder="teacher Name" name="teacherName" value={formData.teacherName} onChange={handleChange} ></input> <br/>
          Students:<br/>
          <MultiSelect options={transformStudents()} value={selected} onChange={setSelected} labelledBy={"Select"}/>
          <input type="text" placeholder="username" name="username" value={formData.username} onChange={handleChange} disabled={props.label == "edit"}></input>
          <input type="password" placeholder="password" name="password" value={formData.password} onChange={handleChange} ></input>
          <input type="submit" value={props.label} />
      </form>
      </>
  );
};

export default TeacherForm;