import React from 'react';
import {useState, useEffect} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function RenderAnswers(props) {
    const { selectedSurvey, selectedAnswerSet, titleSurvey, titleSession } = props;
    const [userAnswers, setUserAnswers] = useState([]);
    const [idToFetch, setIdToFetch] = useState();

    useEffect(() => {
        fetchAllAnswers();
      }, [idToFetch]);

      console.log("renderAnswers props: ", props);

    useEffect(() => {
        if (props.surveyId) {
            console.log("PROPS from render :", props)
            console.log("selected survey from render :", props.surveyId.value)
            let newId = props.surveyId.value;
            setIdToFetch(newId);
        }
    });

     const fetchAllAnswers = () => {
        console.log("IDDD form fetch: ", idToFetch);
        if (idToFetch !== undefined) {
            fetch('https://team4back.herokuapp.com/getUserAnswersBySurvey/' + idToFetch)
            .then(response => response.json())
            .then(data => setUserAnswers(data))
        }
     } 

    const groupedAnswers = [{
        'inputAnswers' : {}
                },{
        'optionAnswers' : {}     
        }
    ]            

    const answerOptionsCount = {};
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
                    //     'refAnswerSetId' :  userAnswers[i].refAnswerSetId,
                            'belongsToSet' : (userAnswers[i].refAnswerSetId === selectedAnswerSet) ? true : false } );
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
                        'belongsToSet' : (userAnswers[i].refAnswerSetId === selectedAnswerSet) ? true : false
                    };
            
                } else {
                    groupedAnswers[1]['optionAnswers'][userAnswers[i].refQuestionString][userAnswers[i].refOptionString].count++;
                    answerOptionsCount[userAnswers[i].refQuestionId]++;
                }
            }
        }   
        return (
            <>
            <h3>Kysely: {titleSurvey}</h3>
            <h3>Vastauskerran ID: {titleSession}</h3>

            {Object.keys(groupedAnswers[0]['inputAnswers']).map(key =>  
            <div className="result-div">
                <h6>{key}</h6>
                <ul className="single-answer-list-ul">
                {groupedAnswers[0]['inputAnswers'][key].map( (answer) => <li className={`${answer.belongsToSet ? "aSet" : "reg"}`}>{answer.answer}</li> ) }
                </ul></div>
            )}

            {Object.keys(groupedAnswers[1]['optionAnswers']).map(key => 
            <div className="result-div">
            <h6>{key}</h6>
            <ul className="single-answer-charts-ul">
                {Object.keys(groupedAnswers[1]['optionAnswers'][key]).map( i =>  
                    
                    <li className={`${groupedAnswers[1]['optionAnswers'][key][i].belongsToSet ? "aSet" : "reg"}`} style={{ background: `linear-gradient(to right, rgb(187, 186, 220) ${(groupedAnswers[1]['optionAnswers'][key][i].count / 
                    answerOptionsCount[groupedAnswers[1]['optionAnswers'][key][i].questionId]*100)}%, rgb(226, 245, 242) 0%)`}}>

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
            </>
        )
}