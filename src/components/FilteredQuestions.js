import React from 'react'

const QuestionPresenter = (props) => {

  const newList = props.questions.filter(element => element.type === props.typeId)

  return(
    <ul>
        {newList.map(item => (<li key='item.id'>{item.question}</li>))}
    </ul>
  )
}
export default QuestionPresenter