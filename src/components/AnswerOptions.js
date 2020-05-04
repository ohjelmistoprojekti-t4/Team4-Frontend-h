import React from 'react'
import {useState, useEffect} from 'react'


const AnswerOptions = (props) => {

  const [options, setOptions] = useState([]);
  const [userTxt, setUserTxt] = useState(""); 
  const [radioItem, setRadioItem] = useState("");
  const [checkboxes, setCheckboxes] = useState({});
  const [answerBody, setAnswerBody] = useState([]);


  const [btnLabel, setBtnLabel] = useState("Seuraava kysymys");

  useEffect(() => fetchData(), []);  

  const handleInputChange = (event) => {
      setUserTxt(event.target.value);
      setAnswerBody([{'textAnswer':event.target.value,'refAnswerQuestion':props.link,'type':props.type, 'refQuestionString':props.questionString}]);
  }
  const handleRadioChange = (event) => {
      setRadioItem(event.target.value);
      setAnswerBody([{'refAnswerOption':event.target.value,'refAnswerQuestion':props.link,'type':props.type,'refQuestionString':props.questionString}]);
  }
  const handleCheckboxChange = (event) => {
/*     console.log("CB-name", event.target.name);
    console.log("CB-value", event.target.value);
     console.log("CB-checked", event.target.checked); */
     setCheckboxes({...checkboxes, [event.target.value] : event.target.checked });



}

  const addAnswer= (answer) => {
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
/*     console.log("SEND");
    console.log("Link: ", props.link);
    console.log("Type: ", props.type);
    console.log("Content: ", userTxt);
    console.log("CB-state: ", checkboxes);
    console.log("radio-state: ", radioItem);  */

    if (props.type === 2) {
      for (const checkbox in checkboxes) {
        if (checkboxes[checkbox] === true) {
          answerBody.push({'refAnswerOption':checkbox,'refAnswerQuestion':props.link,'type':props.type, 'refQuestionString':props.questionString});
        }
      }
    }
    console.log("AnswerBdy: ", answerBody);

    answerBody.forEach(addAnswer);
    
  
    props.parentCallback();
  }

    // const sendData = (data) => {
    //   props.parentCallback(data);
    // }


  const fetchData = () => {
      fetch(props.link + '/options')
      .then(response => response.json())
      .then(data => setOptions(data._embedded.options))
  }
  
  function objectMap(object, mapFn) {
    return Object.keys(object).reduce(function(result, key) {
      result[key] = mapFn(object[key])
      return result
    }, {})
  }

  let optionsArr = [];

  objectMap(options, function(value) {
      optionsArr.push(value);
  })

  console.log("PropsQuestion: ", props.questionString);



  function renderOptions(type) {
    switch(type) {
      case 1:
    //    sendData("hep: options");
        return(
          <>
            <ul>
              {optionsArr.map( (item,i) => <li key={i}>
              <input type="radio" id={item._links.self.href} name="fieldSet1"
                value={item._links.self.href} onChange={handleRadioChange}/>
              <label htmlFor={item._links.self.href}>{item.option}</label>
              </li> )}
            </ul>
            <button onClick={sendAndNextQuestion} className="btnClass">{props.btnLabel}</button>
            </>
        )
      case 2:
    //    sendData("hep: checkboxes");
        return(
          <>
            <ul>
              {optionsArr.map( (item,i) => <li key={i}>
              <input type="checkbox" id={item._links.self.href} name={item.option}
                value={item._links.self.href} onChange={handleCheckboxChange}/>
              <label htmlFor={item._links.self.href}>{item.option}</label>
              </li>)}
            </ul>
            <button onClick={sendAndNextQuestion} className="btnClass">{props.btnLabel}</button>
            </>
        )
      default:
      //  sendData("hep: input: " + userAnswer);
        return (
        <div>
        <input type="text" name="textAnswer"  id="input1" data-question={props.link}
          value={props.value} onChange={handleInputChange}></input>
        <button onClick={sendAndNextQuestion} className="btnClass">{props.btnLabel}</button>
        </div>
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




    
