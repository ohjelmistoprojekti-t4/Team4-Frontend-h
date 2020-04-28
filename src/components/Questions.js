import React from 'react';
import {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import ListOfQuestions from './ListOfQuestions';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Questions() {

    const [questions, setQuestions] = useState([]);
    const [newAnswer, setNewAnswer] = React.useState({'textAnswer':'','refAnswerQuestion':'' }); 

    useEffect(() => fetchData(), [])
    useEffect(() => {
        if (newAnswer.refAnswerQuestion !== "") {
        addAnswer(newAnswer);
        console.log(newAnswer);
        }
    });

    const fetchData = () => {
        fetch('http://localhost:8080/api/questions')
        .then(response => response.json())
        .then(data => setQuestions(data._embedded.questions))
    }

    const addAnswer= (answer) => {
        fetch('http://localhost:8080/api/userAnswers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(answer)
        })
        .catch(err => console.log(err))
      };

      
    const handleSubmit = (event) => {
        event.preventDefault();
        let form = new FormData(document.getElementById("questions-form"));
        for (var key of form.keys()) {
            setNewAnswer({'textAnswer' : form.get(key),'refAnswerQuestion' : key });
        }
    }

    return (
        
        <Container fluid={"xl"} className="BodyContainer">

            <Row>
                <Col lg={10}>
                    <h1 className="main-h1">Kysymykset</h1>

                    <form onSubmit={handleSubmit} id="questions-form">

                        <ListOfQuestions questions={questions} />

                        <button>Lähetä vastaukset</button>

                    </form>
     
                </Col>
        
            </Row>

        </Container>
        
      );


}