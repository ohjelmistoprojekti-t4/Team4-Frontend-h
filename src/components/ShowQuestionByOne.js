import React from 'react';
import { useState, useEffect } from 'react';
import AnswerOptions from './AnswerOptions';
import ProgressBar from './form-elements/ProgressBar';

export default function ShowQuestionsByOne(props) {

    const [index, setIndex] = useState(0);
    const [lastQuestion, setLastQuestion] = useState(false);
    const [btnLabel, setBtnLabel] = useState("Seuraava kysymys");
    const [statePersentage, setStatePersentage] = useState(0);

    function objectMap(object, mapFn) {
        return Object.keys(object).reduce(function(result, key) {
            result[key] = mapFn(object[key])
            return result
        }, {})
    }

    let questionsArr = [];

    objectMap(props.questions, function(value) {
        questionsArr.push(value);
    })

    const callbackFunction = () => {
        console.log("Index before increment: ", index);
        
        console.log("Persentage:", statePersentage);
        nextQuestion();
   }

    let newIndex;
    const nextQuestion = () => {
        
            if ((index + 1) === questionsArr.length) {
                setLastQuestion(true);
                console.log("now is last increment");
            } else if ((index + 2) === questionsArr.length) {
                console.log("one more to go!");
                setBtnLabel("Vastaa ja katso tulokset");
                newIndex = index + 1;
                setIndex(newIndex);
            } else {
                newIndex = index + 1;
                setIndex(newIndex);
            }
    

    }
    

    const Question = () => {
        
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
                                questionString={questionsArr[index].question}  
                                parentCallback = {callbackFunction} />
                        
                    </div>
                </div>
            )
        } else {
            return (
                <div className="qusestion-container">
                    <h5 className="question-heading">Ladataan kysymystä...</h5>
                </div>
            )
        }
    }
    
    if (!lastQuestion) {
        return(
            <>
            <Question />
            </>
        )
    } else {
        return (
            <div className="question-container" id="showSingle">
            
            <div className="question-card"><h5 className="question-heading">Siinä se!</h5>
                
            <p>Ei muuta kysyttävää, kiitos.</p>
                
            </div>
        </div>
            
        )
    }

}