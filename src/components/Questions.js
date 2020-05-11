import React from 'react';
import {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowQuestionsByOne from './ShowQuestionByOne';

export default function Questions(props) {

    // Haetaan kaikki propseina saadun kyselyn kysymykset
    // Näytetään komponentti, joka esittelee kysymykset yksitellen

    const [questions, setQuestions] = useState([]);
    
    useEffect(() => fetchData(), [])

    const fetchData = () => {
        fetch(props.surveyLink + '/questions')
        .then(response => response.json())
        .then(data => setQuestions(data._embedded.questions))
    }
   
    console.log("Survey link: ", props.surveyLink);
    console.log("AnswerSet: ", props.currentAnswerSet);

    return (
        
        <ShowQuestionsByOne questions={questions} answerSetId={props.currentAnswerSet} />
        
      );


}