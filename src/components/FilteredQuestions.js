import React from 'react'
import QuestionPresenter from './QuestionPresenter';
import Radio from './Radio';

export default function Getquestions(props) {

    return(
      <div>
        <h3>All question types:</h3>
        <ul>
          {props.questions.map(item => (
          <li key={item.id}>{item.question}

            <ul><li><Radio options={item.option} /></li></ul>

          </li>))}
        </ul>


        <h3>Question Type 1:</h3>
        <QuestionPresenter questions={props.questions} typeId={1} />

        <h3>Question Type 2:</h3>
        <QuestionPresenter questions={props.questions} typeId={2} />

        <h3>Question Type 3:</h3>
        <QuestionPresenter questions={props.questions} typeId={3} />


      </div>
    )
}