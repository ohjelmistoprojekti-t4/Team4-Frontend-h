import React from 'react';
import {useState, useEffect} from 'react'
import _ from 'lodash'
import { Container, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Results(props) {

    const [userAnswers, setUserAnswers] = useState([]);
    const [title, setTitle] = useState("Kaikki vastaukset kaikkiin kysymyksiin");

    useEffect(() => fetchAnswers(), [])

    const fetchAnswerset = () => {
        fetch('https://team4back.herokuapp.com/api/answerSets/' +props.location.state.answerSetId+ '/userAnswers')
        .then(response => response.json())
        .then(data => setUserAnswers(data._embedded.userAnswers))
    }

    const fetchAllAnswers = () => {
        fetch('https://team4back.herokuapp.com/getUserAnswers')
        .then(response => response.json())
        .then(data => setUserAnswers(data))
    }

    const fetchAnswers = () => {
        if (props.location.state) {
            fetchAnswerset();
            setTitle("Vastauskerran #" +props.location.state.answerSetId+ " vastaukset" );
        } else {
            fetchAllAnswers();
        }
    }
    
    const listing = [];
    let oneAnswer;

    const groupAnswers = () => {
        for (let i=0; i < userAnswers.length; i++) {
            // Käydään läpi kaikki vastausket
            userAnswers[i].textAnswer ? oneAnswer = userAnswers[i].textAnswer : oneAnswer = userAnswers[i].refOptionString;
            if (!(userAnswers[i].refQuestionString in listing)) {
                // Ryhmitellään vastaukset saman kysymyksen mukaan
                listing[userAnswers[i].refQuestionString] = [];
            }
               listing[userAnswers[i].refQuestionString].push(oneAnswer);
        }
    }
    groupAnswers();

    return (
        <>
    
        <Container fluid={"xl"} className="BodyContainer results-component">

            <Row>
                <Col md={12}>
                <h1 className="main-h1">{title}</h1>

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