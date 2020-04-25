import React from 'react';
import {useState, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';

export default function Getquestion() {
    const [questions, setQuestions] = useState([])

    useEffect(() => fetchData(), [])

    const fetchData = () => {
        fetch('http://localhost:8080/questions')
        .then(response => response.json())
        .then(data => {
            setQuestions(data);
        })
    }

    let questionId;
    let question;
    let options;
    let option1, option2, option3;
    if (questions !== undefined) {
        for (let i=0; i < questions.length; i++) {
            questionId = questions[1].id;
            question = questions[1].question;
            options = Object.values(questions[1].option);
            option1 = options[0];
            option2 = options[1];
            option3 = options[2];

        } 
    }
    
    return (
        <>


        <Form>
                    <p className="question-p">{question} (id: {questionId}) </p>

                    <fieldset>
                        <Form.Check 
                            type="radio"
                            id="0"
                            name="question1"
                            label={option1}
                        />

                        <Form.Check
                            type="radio"
                            id="1"
                            name="question1"
                            label={option2}
                        />

                        <Form.Check
                            type="radio"
                            id="1"
                            name="question1"
                            label={option3}
                        />
                    </fieldset>

                    <Button variant="primary" className="submit-question">Submit</Button>
  
                </Form>
                
        </>
    )
}