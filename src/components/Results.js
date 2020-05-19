import React from 'react';
import {useState, useEffect} from 'react';
import Select from 'react-select';
import RenderAnswers from './RenderAnswers';
import { Container, Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Results(props) {

    const [title, setTitle] = useState("Kaikki vastaukset");

    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [selectedSession, setSelectedSession] = useState(null);
    const [surveys, setSurveys] = useState([]);
    const [sessions, setSessions] = useState([]);

    const [TitleSurvey, setTitleSurvey] = useState("Ei kyselyä valittuna");
    const [TitleSession, setTitleSession] = useState("Ei yksittäistä vastauskertaa valittuna");

    const [selectedAnswerSet, setSelectedAnswerSet] = useState("");
    const surveysSelect = [];  
    const sessionsSelect = [];

    useEffect(() => getSurveys(), [])

    useEffect(() => {
        if (surveys !== "") {
            surveys.map(survey => surveysSelect.push({value: survey.id, label: survey.name}))
        }

        if (sessions !== "") {
            sessions.map(session => 
                sessionsSelect.push({value: session.uniqueId, label: session.uniqueId})
            );
        }
    });

    // Ladataan kyselyt
    const getSurveys = () => {
        fetch('https://team4back.herokuapp.com/api/surveys')
        .then(response => response.json())
        .then(data => {
            setSurveys(data._embedded.surveys);
        })
    }

    const handleSurveySelection = (selectedSurvey) => {
        setSelectedSurvey(selectedSurvey);
        setTitleSurvey(selectedSurvey.label);
        getUniqueSessions(selectedSurvey.value);
    };

    const handleSessionSelection = (selectedSession) => {
        setSelectedSession(selectedSession);
        fetchAnswerset(selectedSession.value);
        setTitleSession(selectedSession.label);
    };

    const getUniqueSessions = (survey) => {
        fetch('https://team4back.herokuapp.com/api/surveys/' + survey +'/uniqueUser')
        .then(response => response.json())
        .then(data => {
            setSessions(data._embedded.uniqueUserSessions);
        })
    }

    const fetchAnswerset = (answerSetId) => {
        fetch('https://team4back.herokuapp.com/api/uniqueUserSessions/' +answerSetId+ '/answerSet')
        .then(response => response.json())
        .then(data => { console.log("userAnswers: ", data);
                        setSelectedAnswerSet(data.answerSetId);
        })
    }

    return (
        <>
        <Container fluid={"xl"} className="BodyContainer results-component">

            <Row>
                <Col md={12}>
                <h1 className="content-h1">{title}</h1>
 
                <Select
                            className="select-survey"
                            value={selectedSurvey}
                            onChange={handleSurveySelection}
                            options={surveysSelect}
                            placeholder="Valitse kysely..."
                    />
                <Select
                            className="select-survey"
                            value={selectedSession}
                            onChange={handleSessionSelection}
                            options={sessionsSelect}
                            placeholder="Valitse vastauskerta..."
                />
                     
                <RenderAnswers
                    surveyId={selectedSurvey}
                    selectedAnswerSet={selectedAnswerSet}
                    titleSurvey={TitleSurvey}
                    titleSession={TitleSession}
                />
               
                </Col>
        
            </Row>

        </Container>
        </>

      );


}