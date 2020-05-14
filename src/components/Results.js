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
               
                        }
                },{
        'optionAnswers' : {

                        }     
        }
    ]            

    console.log(userAnswers);
    const answerOptionsCount = {};
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
                    answerOptionsCount[userAnswers[i].refQuestionId] = 0;                               
                }

                // Tarkistetaan, onko vaihtoehtovastauksen laskuria jo lisätty
                if (!(userAnswers[i].refOptionString in groupedAnswers[1]['optionAnswers'][userAnswers[i].refQuestionString])) {
                    // Lisätään vaihtoehtovastaus ja asetetaan vaihtoehdon vastausten laskurin arvoksi 1 ja kasvatetaan kaikkien vaihtoehtojen määrää
                    answerOptionsCount[userAnswers[i].refQuestionId]++;
                    groupedAnswers[1]['optionAnswers'][userAnswers[i].refQuestionString][userAnswers[i].refOptionString] = {
                                                                                                     'label' : userAnswers[i].refOptionString,
                                                                                                     'questionId' : userAnswers[i].refQuestionId,   
                                                                                                     'count' : 1,
                                                                                                     'refAnswerSetId' :  userAnswers[i].refAnswerSetId,
                                                                                                     'belongsToSet' : false
                                                                                                    };
                        
                        
                } else {
                    groupedAnswers[1]['optionAnswers'][userAnswers[i].refQuestionString][userAnswers[i].refOptionString].count++;
                    answerOptionsCount[userAnswers[i].refQuestionId]++;
                }
            }
        }   
    }
    groupAnswers();

    console.log("Grouped answers arr: ", groupedAnswers);
    console.log("count by id: ", answerOptionsCount);

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
                <ul className="single-answer-ul-charts">
                    {Object.keys(groupedAnswers[1]['optionAnswers'][key]).map( i =>  
                        
                        <li style={{ background: `linear-gradient(to right, rgb(187, 186, 220) ${(groupedAnswers[1]['optionAnswers'][key][i].count / 
                        answerOptionsCount[groupedAnswers[1]['optionAnswers'][key][i].questionId]*100)}%, rgb(226, 245, 242) 0%)`}}>

                        {/*  <span className="results-option-persentage" style={{width: 
                            (groupedAnswers[1]['optionAnswers'][key][i].count / 
                             answerOptionsCount[groupedAnswers[1]['optionAnswers'][key][i].questionId])
                             * 100 + '%'}} >
                        </span>  */}
                        <span className="results-option-label">
                        {groupedAnswers[1]['optionAnswers'][key][i].label}
                            <span className="results-option-details">
                                    ({groupedAnswers[1]['optionAnswers'][key][i].count} kpl)
                            </span>
                        </span>
                    
                        </li> )
                        
                    }
                </ul></div>   
                )}
                
    
                </Col>
        
            </Row>

        </Container>
        </>

      );


}