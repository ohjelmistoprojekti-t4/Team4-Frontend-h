import React from 'react';
import {useState, useEffect} from 'react';
import IndexHero from './img/index-hero-tr.png';
import Questions from './Questions';

import { Container, Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SelectAndStart() {

    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [surveys, setSurveys] = useState([]);
    const [currentAnswerSet, setCurrentAnswerSet] = useState();
    const [componentToRender, setComponentToRender] = useState("default");

    const options = [];    

    useEffect(() => getSurveys(), [])

    // Kun kyselyt ovat latautuneet lisätään ne select-valikkoon
    useEffect(() => {
        if (surveys !== "") {
            surveys.map(survey => options.push({value: survey._links.self.href, label: survey.name, id: survey.id}))
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

    // Jos kysely on valittu, luodaan uusi AnswerSet ja näytetään kyselyn komponentti
    const startSurvey = () => {
        addAnswerSet();
        if (selectedSurvey) {
            setComponentToRender("survey");
        } else {
            alert("Valitse ensin kysely, johon haluat vastata!");
        }
    }

    // Varmistetaan, haluaako käyttäjä keskeyttää vastaamisen ja näytetään kyselyiden lista
    const cancelSurvey = () => {
        if (window.confirm("Haluatko varmasti keskeyttää vastaamisen?")) {
            setComponentToRender("default");
        }
    }

    // Luodaan uusi AnswerSet, eli kaikki tietyn vastauskerran vastaukset yksilöivä tunnus
    const addAnswerSet = () => {
    fetch('https://team4back.herokuapp.com/api/answerSets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
        .then(response => response.json())
        .then(data => {
            console.log("First data asetID: ", data.answerSetId);
            setCurrentAnswerSet(data.answerSetId);
        })
        .catch(err => console.log(err))
    };

    // Valikko, jolla asetetaan valittu kysely muuttujaan selectedSurvey
    const handleSurveySelection = (selectedSurvey) => {
        setSelectedSurvey(selectedSurvey);
    };

    function renderComponent(type) {
        switch(type) {
          case "survey":
            // Näytetään kysely ja keskeyttämisen mahdollistava painike
            return(
                <>
                    
                        <h1 className="quiz-h1">{selectedSurvey.label}
                            <Button type="button" variant="link" className="cancelSurveyBtn" onClick={() => cancelSurvey() }>
                                Sulje
                            </Button>
                        </h1>

                        <Questions surveyId={selectedSurvey.id} surveyLink={selectedSurvey.value} currentAnswerSet={currentAnswerSet} />
                        
                </>
            )
          default:
            // Oletuksena näytetään lista kyselyistä ja muut mahdolliset aloitussivun komponentit
            return (
                  <> 
                  <Row>
                    <Col sm={12} md={6}>
                        <h1 className="main-h1">Valitse kysely!</h1>
                            <Select
                            className="select-survey"
                            value={selectedSurvey}
                            onChange={handleSurveySelection}
                            options={options}
                            placeholder="Valitse kysely..."
                            />
                            <Button type="button" onClick={() => startSurvey() }>Aloita kysely</Button>
                    </Col>
                    <Col sm={12} md={6}>
                            <img src={IndexHero} className="img-fluid" alt="Mestarikysely" />
                    </Col>
                    </Row>
                  </>
            )
        }
    }
   
    // Näytetään käyttäjälle joko kyselyn valitsemisen mahdollistava valikko yms tai siirrytään kysymyksiin
    return (
        <Container fluid={"xl"} className="BodyContainer">

            <Row>
                <Col className="main-hero">
                    
                        {renderComponent(componentToRender)}
    
                </Col>
            </Row>
        </Container>
    )
}