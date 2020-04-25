import React from 'react'
import {useState, useEffect} from 'react'
import QuestionPresenter from './components/QuestionPresenter'

export default function Getquestions() {
    const [questions, setQuestions] = useState([])

    useEffect(() => fetchData(), [])

    const fetchData = () => {
        fetch('https://team4back.herokuapp.com/questions')
        .then(response => response.json())
        .then(data => setQuestions(data))
    }

    console.log(questions)

    return(
      <div>
        <h3>Question Type 1:</h3>
        <QuestionPresenter questions={questions} typeId={1} />

        <h3>Question Type 2:</h3>
        <QuestionPresenter questions={questions} typeId={2} />

        <h3>Question Type 3:</h3>
        <QuestionPresenter questions={questions} typeId={3} />

        <h3>All question types:</h3>
        <ul>
          {questions.map(item => (<li key='item.id'>{item.question}</li>))}
        </ul>
      </div>
    )
}