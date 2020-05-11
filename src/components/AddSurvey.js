import React from 'react';
import {useState, useEffect} from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SurveyList from './SurveyList';


export default function AddSurvey(props) {
    const [newSurvey, setNewSurvey] = useState({ name: ''})
    const [surveys, setSurveys] = useState([])
    

    useEffect(() => fetchData(), [])
    const fetchData = () => {
        fetch('https://team4back.herokuapp.com/api/surveys')
        .then(response => response.json())
        .then(data => setSurveys(data._embedded.surveys))
    }


    const handleChange = (event) => {
        setNewSurvey({...newSurvey, [event.target.name]: event.target.value})
        console.log(newSurvey)
    }
  
    const handleSubmit = () => {
        
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
    window.location.reload(false);
 };
  

    return(
        <Container fluid={"xl"} className="BodyContainer">

            <Row>
                <Col lg={10}>
        
                <h1 className="main-h1">Lisää kysely</h1>
    
                    <div id="survey-form">
                        <label for="name">Luo kysely:</label> <br></br>
                        <input type="text" id="1" name="name" value={newSurvey.name} onChange={handleChange} />
                        

                        <Button className="btn btn-primary" value="Luo kysely" onClick={handleSubmit}>Lisää Kysely</Button>
                    </div>

                     <SurveyList surveys={surveys}/>
                </Col>
                
                
                
            </Row>

        </Container>
    );

}