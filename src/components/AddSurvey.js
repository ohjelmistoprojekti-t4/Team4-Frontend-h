import React from 'react';
import {useState, useEffect} from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SurveyList from './SurveyList';


export default function AddSurvey(props) {
    const [newSurvey, setNewSurvey] = useState({ name: ''})
    const [adding, setAdding] = useState(false)


    
    const handleChange = (event) => {
        setNewSurvey({...newSurvey, [event.target.name]: event.target.value})
    }
  
    const handleSubmit = () => {
        if (newSurvey.name !== "") {
        const surveyBody = { "name": newSurvey.name  }
    
    fetch('https://team4back.herokuapp.com/api/surveys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
        },
            body: JSON.stringify(surveyBody)
        }) 
        
        setAdding(true)
        } 
        else {
            alert("Anna kyselylle nimi!")
        }
        
    };
  
    return(
        <Container fluid={"xl"} className="BodyContainer">
            <Row>
                <Col>
                <h1 className="content-h1">Lisää kysely</h1>
                    <div id="survey-form">
                        
                        <input type="text" className="AddSurveyInput" id="1" name="name" value={newSurvey.name} placeholder="Kyselyn nimi" onChange={handleChange} />
                        <br></br>
                        <Button style={{marginTop: 15, marginBottom: 30}} className="btn btn-primary" value="Luo kysely" onClick={handleSubmit}>Lisää kysely</Button>
                    </div>
                     <SurveyList adding={adding} setAdding={setAdding}/> 
                </Col>
            </Row>
        </Container>
    );
}