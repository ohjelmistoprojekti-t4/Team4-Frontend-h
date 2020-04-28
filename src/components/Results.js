import React from 'react';
import {useState, useEffect} from 'react'
import _ from 'lodash'
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Results() {

    const [userAnswers, setUserAnswers] = useState([]);
    useEffect(() => fetchData(), [])
    
    function combineKeyData(data) {
        var output = {}, item;
        for (var i = 0; i < data.length; i++) {
            item = data[i];
            for (var prop in item) {
                if (item.hasOwnProperty(prop)) {
                    if (!(prop in output)) {
                        output[prop] = [];
                    }
                    output[prop].push(item[prop]);
                }
            }
        }
        return output;
    }
    
 
  
    var result = [];

    function sortAnswers(input) {
        for (var i = 0; i < input.length; i++) {
            var data = input[i];
            var found=false;
            for(var j=0; j<result.length; j++) {
                if(result[j].refQuestionId === data.refQuestionId) {
                    found=true;
                    result[j].value = data.value;
                    break;
                }
            }
            if(!found) {
                result.push(data);
            }
        }
    }


    if (userAnswers.length > 0) {
        let result = sortAnswers(userAnswers);
        console.log(result);
    }

    const fetchData = () => {
        fetch('http://localhost:8080/getUserAnswers')
        .then(response => response.json())
        .then(data => setUserAnswers(data))
    }
    

    return (
        <>
    
        <Container fluid={"xl"} className="BodyContainer">

            <Row>
                <Col md={12}>
                <h1 className="main-h1">Tulokset</h1>

                <h3>Vastaukset kysymyksen mukaan ryhmiteltyinä</h3>
                    <ul>
                    {userAnswers.map(item => (
                    <li key={item.userAnswerId}>{item.refQuestionString}

                        <ul><li>{item.textAnswer}</li></ul>

                    </li>))}
                    </ul>
    
                </Col>
        
            </Row>

        </Container>
        </>

      );


}