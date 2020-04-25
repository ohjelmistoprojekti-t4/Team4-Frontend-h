import React from 'react';
import {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import FilteredQuestions from './FilteredQuestions';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Questions() {

    const [questions, setQuestions] = useState([])

    useEffect(() => fetchData(), [])

    const fetchData = () => {
        fetch('http://localhost:8080/questions')
        .then(response => response.json())
        .then(data => setQuestions(data))
    }



    return (
        <>
    
        <Container fluid={"xl"} className="BodyContainer">

            <Row>
                <Col md={12}>
                    <h1 className="main-h1">Kysymykset</h1>

                    <FilteredQuestions questions={questions} />

     
                </Col>
        
            </Row>

        </Container>
        </>

      );


}