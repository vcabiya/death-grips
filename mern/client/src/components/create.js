import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./create.css"

export default function Create() {
 const [form, setForm] = useState({
   title: "",
   content: "",
 });
 const navigate = useNavigate();

 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }

 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();

   // When a post request is sent to the create url, we'll add a new record to the database.
   const newIssue= { ...form };

   await fetch("http://localhost:5050/issues", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newIssue),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

   setForm({ title: "", content: "", });
   navigate("/");
 }

 // This following section will display the form that takes the input from the user.
 return (
   <div className="bodyStyle">
     <h1 className="header">Raise New Issue</h1>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="title">Title</label>
         <input
           type="text"
           className="form-control"
           id="title"
           value={form.title}
           rows="3"
           onChange={(e) => updateForm({ title: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="content">Details (include source)</label>
         <textarea 
          className="form-control" 
          id="content" 
          rows="5"
          value={form.content}
          onChange={(e) => updateForm({ content: e.target.value })}>
         </textarea>
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Submit"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}
