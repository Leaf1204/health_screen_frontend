import React from "react";
import MultiSelect from "react-multi-select-component";

const TeacherForm = (props) => {
  //state for the form

  // todo : extract .parents property, then use it to build a select element (each value is an option)
  const [formData, setFormData] = React.useState(props.teacher);
  const [students] = React.useState(props.students);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
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
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder="teacher Name" name="teacherName" value={formData.teacherName} onChange={handleChange} ></input> <br/>
          Students:<br/>
          {
              students.map((student)=>{
              return <><input type="checkbox" id={student._id} name={student._id} value={student._id}></input> <label for={student._id}>{student.child_name}</label><br/></>
              })
          }
          {/* <MultiSelect options={transformStudents()} /> */}
          <input type="text" placeholder="username" name="username" value={formData.username} onChange={handleChange} ></input>
          <input type="password" placeholder="password" name="password" value={formData.password} onChange={handleChange} ></input>
          <input type="submit" value="Create teacher" />
      </form>
      </>
  );
};

export default TeacherForm;