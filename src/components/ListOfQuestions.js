import React from 'react'
import AnswerOptions from './AnswerOptions';

export default function ListOfQuestions(props) {

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

  console.log("questionArr", questionsArr);

  return(
      <ul className="questions-ul">
        {props.questions.map( (item,i) => <li key={i} className="question-li">{item.question}
          <ul className="options-ul">
            <AnswerOptions link={item._links.self.href} type={item.type} />
          </ul>
        </li> )}
      </ul>
    )
}