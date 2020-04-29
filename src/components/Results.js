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

    const groupAnswers = () => {

        for (let i=0; i < userAnswers.length; i++) {

            if (!(userAnswers[i].refQuestionString in listing)) {
                listing[userAnswers[i].refQuestionString] = [];
            }
            listing[userAnswers[i].refQuestionString].push(userAnswers[i].textAnswer);
        }
    }
    groupAnswers();

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