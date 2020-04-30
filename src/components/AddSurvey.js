import React from 'react';
import {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function AddSurvey(props) {
    const [newSurvey, setNewSurvey] = useState({ name: ''})
    

  const handleChange = (event) => {
    setNewSurvey({...newSurvey, [event.target.name]: event.target.value})
    console.log(newSurvey)
  }

    const handleSubmit = (event) => {
        event.preventDefault()
       

        const surveyBody = { "name": newSurvey.name  }
        console.log(surveyBody)
        
    fetch('https://team4back.herokuapp.com/api/surveys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(surveyBody)
        }) 
        console.log("Survey", surveyBody)
          
    };


    return  (
        <Container fluid={"xl"} className="BodyContainer">

            <Row>
                <Col lg={10}>
        
                <h1 className="main-h1">Uusi kysely</h1>
    
                    <form onSubmit={handleSubmit} id="survey-form">
                        <label for="name">Luo kysely:</label> <br></br>
                        <input type="text" id="1" name="name" value={newSurvey.name} onChange={handleChange} />
                        

                        <input type="submit" value="Luo kysely" />
                    </form>

        
                </Col>
        
            </Row>

        </Container>
    );
    
}