import React from 'react';
import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SurveyEdit(props) {

    const [editName, setEditName] = useState({name: ''});
  
        const handleChange = (event) => {
            setEditName({...editName, [event.target.name]: event.target.value})
            console.log(editName)
          }
  
        function editSurvey(event){
          event.preventDefault()
          console.log("id", props.id)

          fetch(props.id, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(editName)
          }) 
          console.log("Survey", editName)
          window.location.reload(false);
          }
  
        return(
          <form onSubmit={editSurvey} id="edit-survey-rename">
          <label for="name">Nimeä {props.name} uudelleen </label> <br></br>
          <input type="text" id="1" name="name" value={editName.name} onChange={handleChange} />
          
  
          <input type="submit" class="btn btn-primary" value="OK" />
      </form>
        )
    }