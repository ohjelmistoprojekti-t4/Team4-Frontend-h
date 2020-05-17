import React, { useEffect } from 'react';
import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const SurveyEdit = (props) => {
  const [editName, setEditName] = useState({name: ''});

  const handleEdit = (event) => {
      setEditName({...editName, [event.target.name]: event.target.value})
      console.log(editName)
    }

  function editSurvey(){
    if (editName.name !== "") {
    console.log("id", props.id)
    fetch(props.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editName)
    }) 
    
    console.log("Survey", editName)
    props.render(true)
    } else {
      alert("Anna kyselyn uusi nimi!")
  }
  }

  return <> 
    <div id="edit-survey-rename">
    <input type="text" 
      placeholder="Anna uusi nimi" 
      id={props.id} 
      name="name" 
      value={editName.name} 
      onChange={handleEdit} 
      />
 
    <Button className="btn btn-success" 
      style={{marginRight:15, marginLeft:10}} 
      value="OK" 
      onClick={editSurvey}
      >OK</Button>
    </div>
    </>
  }


export default SurveyEdit