import React from 'react';
import {useState, useEffect} from 'react'
import _ from 'lodash'
import { Container, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Results() {

    const [userAnswers, setUserAnswers] = useState([]);

    useEffect(() => fetchData(), [])

    const fetchData = () => {
        fetch('https://team4back.herokuapp.com/getUserAnswers')
        .then(response => response.json())
        .then(data => setUserAnswers(data))
    }

  
    const listing = [];
    console.log("data: ", userAnswers);
    console.log("listing: ", listing); 

    let oneAnswer;
    let allQuestions = 0;
    let similarQuestions = 0;
    const groupAnswers = () => {
        for (let i=0; i < userAnswers.length; i++) {
            allQuestions++;
            userAnswers[i].textAnswer ? oneAnswer = userAnswers[i].textAnswer : oneAnswer = userAnswers[i].refOptionString;
            if (!(userAnswers[i].refQuestionString in listing)) {
                similarQuestions++;
                listing[userAnswers[i].refQuestionString] = [];
            }
               listing[userAnswers[i].refQuestionString].push(oneAnswer);
        }
    }
    groupAnswers();
    console.log("listing[4]:", listing[4]); 
    console.log("All questions: ", allQuestions); 
    console.log("Similar questions: ", similarQuestions);

    return (
        <>
    
        <Container fluid={"xl"} className="BodyContainer results-component">

            <Row>
                <Col md={12}>
                <h1 className="main-h1">Tulokset</h1>

                <h3>Vastaukset kysymyksen mukaan ryhmiteltyinä</h3>
                
                {Object.keys(listing).map(key => 
                <div className="result-div">
                    <h6>{key}</h6>
                    <ul className="single-answer-ul">
                       { listing[key].map((answer) => <li>{answer}</li>) }
                    </ul>
                </div>
                )}
    
                </Col>
        
            </Row>

        </Container>
        </>

      );


}