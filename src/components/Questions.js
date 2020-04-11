import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Getquestion from './Getquestion';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Questions() {



    return (
        <>
    
        <Container fluid={"xl"} className="BodyContainer">

            <Row>
                <Col md={12}>
                <h1 className="main-h1">Kysymykset</h1>

                <Getquestion />

                
        
    
                </Col>
        
            </Row>

        </Container>
        </>

      );


}