import React from 'react';
import { useState } from 'react';
import AnswerOptions from './AnswerOptions';
import Spinner from 'react-bootstrap/Spinner';
import ProgressBar from './form-elements/ProgressBar';
import RenderAnswers from './RenderAnswers';

export default function ShowQuestionsByOne(props) {

    const [index, setIndex] = useState(0);
    const [lastQuestion, setLastQuestion] = useState(false);
    const [btnLabel, setBtnLabel] = useState("Seuraava kysymys");
    const [statePersentage, setStatePersentage] = useState(0);
    const [userSession, setUserSession] = useState();


    const addUniqueUserSession = () => {
        fetch('https://team4back.herokuapp.com/api/uniqueUserSessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answerSet : 'https://team4back.herokuapp.com/api/answerSets/' + props.answerSetId,
                                   survey : props.surveyLink })
        })
            .then(response => response.json())
            .then(data => {
                setUserSession(data.uniqueId);
            })
            .catch(err => console.log(err))
        };

    function objectMap(object, mapFn) {
        return Object.keys(object).reduce(function(result, key) {
            result[key] = mapFn(object[key])
            return result
        }, {})
    }

    let questionsArr = [];

    // Käydään läpi palvelimelta saatu kysymysobjekti ja tallennetaan kysymykset muuttujaan questionsArr
    objectMap(props.questions, function(value) {
        questionsArr.push(value);
    })
    
    const nextQuestion = () => {
            let newIndex;
            // Tarkistetaan onko kysymys viimeinen tai toiseksi viimeinen

            if ((index + 1) === questionsArr.length) {
                setLastQuestion(true);
            } else if ((index + 2) === questionsArr.length) {
                addUniqueUserSession();
                setBtnLabel("Vastaa ja katso tulokset");
                newIndex = index + 1;
                setIndex(newIndex);
            } else {
                newIndex = index + 1;
                setIndex(newIndex);
            }
    }

    const Question = () => {
        
        // Kysymysten latauduttua näytetään spinnerin sijaan ensimmäinen kysymys

        if (questionsArr[index] && questionsArr[index]._links) {
            setStatePersentage( 100* (index + 1) / questionsArr.length);
            return (
                <div className="question-container" id="showSingle">
                    <ProgressBar percentage={statePersentage} />
                    <div className="question-count">{index + 1}/{questionsArr.length}</div>
                    <div className="question-card"><h5 className="question-heading">{questionsArr[index].question}</h5>
                            <AnswerOptions
                                btnLabel={btnLabel} 
                                link={questionsArr[index]._links.self.href} 
                                type={questionsArr[index].type}
                                questionId={questionsArr[index].id} 
                                questionString={questionsArr[index].question}  
                                answerSetId={props.answerSetId}
                                nextQuestion = {nextQuestion} />
                    </div>
                </div>
            )
        } else {
            return (
                <div className="question-container">
                    <br />
                      <Spinner animation="border" variant="info" />
                    <br />
                </div>
            )
        }
    }
    
    // Näytetään kysymyksiä niin kauan, kun niin on
    if (!lastQuestion) {
        return(
            <>
            <Question />
            </>
        )
    // Kun viimeiseen kysymykseen on vastattu, näytetään linkki tämän vastauskerran vastauksiin    
    } else {
        return (
         
            <RenderAnswers
                surveyId={ {'value': props.surveyId } }
                selectedAnswerSet={props.answerSetId}
                titleSurvey={props.surveyId}
                titleSession={props.answerSetId}
            />
        )
    }

}