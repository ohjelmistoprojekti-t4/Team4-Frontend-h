import React from 'react'
import {useState, useEffect} from 'react'
import Radio from './form-elements/Radio';
import Checkbox from './form-elements/Checkbox';

const AnswerOptions = (props) => {
    const [options, setOptions] = useState([]);
    const [checkboxes, setCheckboxes] = useState({});
    const [answerBody, setAnswerBody] = useState([]);

    useEffect(() => fetchData(), []);  

    const handleInputChange = (event) => {

      setAnswerBody([{
        'textAnswer':event.target.value,
        'refAnswerQuestion':props.link,
        'type':props.type,
        'refQuestionString':props.questionString,
        'refQuestionId':props.questionId,
        'refAnswerSetId' :props.answerSetId,
        'refAnswerAnswerSet': 'https://team4back.herokuapp.com/api/answerSets/' + props.answerSetId
      }]);
    }
    const handleRadioChange = (optionid, optionStr, event) => {
      setAnswerBody([{
        'refAnswerOption':event.target.value,
        'refOptionId': optionid, 
        'refAnswerQuestion':props.link,
        'refOptionString': optionStr,
        'type':props.type,
        'refQuestionString':props.questionString,
        'refQuestionId':props.questionId,
        'refAnswerSetId' :props.answerSetId,
        'refAnswerAnswerSet': 'https://team4back.herokuapp.com/api/answerSets/' + props.answerSetId
      }]);
    }
    const handleCheckboxChange = (optionid, optionStr, event) => {
        setCheckboxes({...checkboxes, [event.target.name] : [optionStr, event.target.checked, optionid]});
    }


    const addAnswer= (answer) => {
      console.log("AnswerObje: ", answerBody);
    fetch('https://team4back.herokuapp.com/api/userAnswers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(answer)
    })
    .catch(err => console.log(err))
    };

    const sendAndNextQuestion = () => {
      console.log("checkboxes: ", checkboxes)
      if (props.type === 2) {
        for (const checkbox in checkboxes) {
          if (checkboxes[checkbox][1] === true) {   // Muodostetaan json-answer-body vain, jos checkbox on valittuna

              answerBody.push({
              'refAnswerOption': checkbox,
              'refOptionId': checkboxes[checkbox][2],     // Tallennetaan optionin id
              'refOptionString': checkboxes[checkbox][0],
              'refAnswerQuestion': props.link,
              'type':props.type,
              'refQuestionString': props.questionString,
              'refQuestionId': props.questionId,
              'refAnswerSetId' :props.answerSetId,
              'refAnswerAnswerSet': 'https://team4back.herokuapp.com/api/answerSets/' + props.answerSetId
            });
          }
        }
      }
      answerBody.forEach( addAnswer );
      props.nextQuestion();
    }

    const fetchData = () => {
      fetch(props.link + '/options')
      .then(response => response.json())
      .then(data => setOptions(data._embedded.options))
    }

  /*   function objectMap(object, mapFn) {
      return Object.keys(object).reduce(function(result, key) {
        result[key] = mapFn(object[key])
        return result
      }, {})
    }

    let optionsArr = [];
    //// Fix this: NO need in optionsArr!!! Just "options data"

    objectMap(options, function(value) {
      optionsArr.push(value);
    }); */
    //console.log("optionsArr: ", optionsArr);
    function renderOptions(type) {
    switch(type) {
      case 1:
        return(
          <>
            <ul className="options-container">
              {options.map( (item,i) => <li key={i}>
              <Radio name="radios" label={item.option} data-str={item.option} value={item._links.self.href} onChange={(e) => handleRadioChange(item.optionid, item.option, e)} />
              </li> )}
            </ul>
            <button onClick={sendAndNextQuestion} className="btnSubmitQuestion">{props.btnLabel}</button>
            </>
        )
      case 2:
        return(
          <>
            <ul className="options-container">
              {options.map( (item,i) => <li key={i}>
              <Checkbox label={item.option} name={item._links.self.href} value={item._links.self.href} onChange={(e) => handleCheckboxChange(item.optionid, item.option, e)} />
              </li>)}
            </ul>
            <button onClick={sendAndNextQuestion} className="btnSubmitQuestion">{props.btnLabel}</button>
            </>
        )
      default:
        return (
        <> 
        <div className="options-container">
        <i className="fa fa-pencil-square icon"></i>
        <input type="text" name="textAnswer" id="input1" data-question={props.link} autocomplete="off"
          value={props.value} onChange={handleInputChange} autoFocus placeholder="Vastaus..." className="answerInput"></input>
        </div>
        <button onClick={sendAndNextQuestion} className="btnSubmitQuestion">{props.btnLabel}</button>
        </>
        )
      }
    }

    return(
        <>
            {renderOptions(props.type)}

        </>
      )

}
export default AnswerOptions





