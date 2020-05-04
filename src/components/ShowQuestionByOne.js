import React from 'react';
import { useState, useEffect } from 'react';
import AnswerOptions from './AnswerOptions';
import ProgressBar from './ProgressBar';

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
        setStatePersentage( 100* (index + 1) / questionsArr.length);
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
            return (
                <ul className="questions-ul" id="showSingle">
                    <li>Kysymys {index + 1} / {questionsArr.length}</li>
                    <li className="question-li">{questionsArr[index].question}
                        <ul className="options-ul">
                            <AnswerOptions
                                btnLabel={btnLabel} 
                                link={questionsArr[index]._links.self.href} 
                                type={questionsArr[index].type}
                                questionString={questionsArr[index].question}  
                                parentCallback = {callbackFunction} />
                        </ul>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="questions-ul">
                    <li className="question-li">Ladataan kysymystä...</li>
                </ul>
            )
        }
    }
    
    if (!lastQuestion) {
        return(
            <>
            <ProgressBar percentage={statePersentage} />
            <Question />
            </>
        )
    } else {
        return (
            <p>Tuloksia!</p>
        )
    }

}