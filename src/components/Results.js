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

    const groupedAnswers = [{
        'inputAnswers' : {
                     /*    'question1' : [{'answer': '', 'answerId':'', 'isInSet':''}],
                
                        'question2' : [{'answer': '', 'answerId':'', 'isInSet':''}] */
                        }
                },{
        'optionAnswers' : {
/*                         'question1' : [{'answer': '', 'answerId':'', 'isInSet':''}],
                        'question' : [{'optionLabel': 'A', 'optionCount': 1, 'answerId': 1, 'isInSet': 'false'},
                                      {'optionLabel': 'A', 'optionCount': 1, 'answerId': 1, 'isInSet': 'false'}]   */  
                        }     
        }
    ]            
        
    const groupAnswers = () => {
        for (let i=0; i < userAnswers.length; i++) {
            // Jos vastauksessa on input-kentästä tullut tekstivastaus
            if (userAnswers[i].textAnswer) {
                // Jos kysymystä ei ole valmiiksi objektissa
                if (!(userAnswers[i].refQuestionString in groupedAnswers[0]['inputAnswers'])) {
                    // Luodaan uusi kysymystietue
                    groupedAnswers[0]['inputAnswers'][userAnswers[i].refQuestionString] = []                                                   
                } 
                // Tai lisätään uusi vastaus kysymyksen alle
                    groupedAnswers[0]['inputAnswers'][userAnswers[i].refQuestionString].push(
                                                                  {  'answer': userAnswers[i].textAnswer,
                                                                     'refAnswerSetId' :  userAnswers[i].refAnswerSetId,
                                                                     'belongsToSet' : false } );
            // Jos vastaus on radio tai checkbox    
            } else {
                // Jos kysymystä ei ole valmiiksi objektissa
                if (!(userAnswers[i].refQuestionString in groupedAnswers[1]['optionAnswers'])) {
                    // Luodaan uusi kysymystietue
                    groupedAnswers[1]['optionAnswers'][userAnswers[i].refQuestionString] = [];                               
                }

                // Tarkistetaan, onko vaihtoehtovastauksen laskuria jo lisätty
                if (!(userAnswers[i].refOptionString in groupedAnswers[1]['optionAnswers'][userAnswers[i].refQuestionString])) {
                    // Lisätään vaihtoehtovastaus ja asetetaan laskurin arvoksi 0
                    groupedAnswers[1]['optionAnswers'][userAnswers[i].refQuestionString][userAnswers[i].refOptionString] = {
                                                                                                     'label' : userAnswers[i].refOptionString,   
                                                                                                     'count' : 1,
                                                                                                     'refAnswerSetId' :  userAnswers[i].refAnswerSetId,
                                                                                                     'belongsToSet' : false
                                                                                                    };
                        
                        
                } else {
                    groupedAnswers[1]['optionAnswers'][userAnswers[i].refQuestionString][userAnswers[i].refOptionString].count++;
                }
            }
        }   
    }
    groupAnswers();

    console.log("Grouped answers arr: ", groupedAnswers);


/*     const test = () => {
            Object.keys(groupedAnswers[0]['inputAnswers']).map(key => { 
                console.log("Kys: ", key);
                groupedAnswers[0]['inputAnswers'][key].map( (answer) => console.log("Answer: ", answer.answer) ) 
                }
            )

            Object.keys(groupedAnswers[1]['optionAnswers']).map(key => { 
                console.log("Kys opt: ", key);
                Object.keys(groupedAnswers[1]['optionAnswers'][key]).map( i =>  {
                    console.log("--key: ", i);
                    console.log("-----i label: ", groupedAnswers[1]['optionAnswers'][key][i].label );
                    console.log("-----i count: ", groupedAnswers[1]['optionAnswers'][key][i].count );
                    }
                    );
                }
            )

    }
 test(); */

    return (
        <>
    
        <Container fluid={"xl"} className="BodyContainer results-component">

            <Row>
                <Col md={12}>
                <h1 className="main-h1">{title}</h1>

                <h3>Vastaukset kysymyksen mukaan ryhmiteltyinä</h3>

                {Object.keys(groupedAnswers[0]['inputAnswers']).map(key =>  
                <div className="result-div">
                    <h6>{key}</h6>
                    <ul className="single-answer-list-ul">
                    {groupedAnswers[0]['inputAnswers'][key].map( (answer) => <li>{answer.answer}</li> ) }
                    </ul></div>
                
                )}

                {Object.keys(groupedAnswers[1]['optionAnswers']).map(key => 
                <div className="result-div">
                <h6>{key}</h6>
                <ul className="single-answer-ul">
                    {Object.keys(groupedAnswers[1]['optionAnswers'][key]).map( i =>  
                        
                        <li>{groupedAnswers[1]['optionAnswers'][key][i].label} / {groupedAnswers[1]['optionAnswers'][key][i].count}</li> )
                        
                    }
                </ul></div>   
                )}
                
    
                </Col>
        
            </Row>

        </Container>
        </>

      );


}