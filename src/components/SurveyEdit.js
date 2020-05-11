import React, { useEffect } from 'react';
import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const SurveyEdit = (props) => {
  const [editName, setEditName] = useState({name: ''});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleEdit = (event) => {
      setEditName({...editName, [event.target.name]: event.target.value})
      console.log(editName)
    }

  function editSurvey(){
    
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


    return <> 
    <div id="edit-survey-rename">
    <label for="name">Nimeä {props.name} uudelleen </label> <br></br>
    <input type="text" id={props.id} name="name" value={editName.name} onChange={handleEdit} />
 
    <Button className="btn btn-success" value="OK" onClick={editSurvey}>OK</Button>
    </div>
    </>
  }


export default SurveyEdit