import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, InputGroup, Alert } from 'react-bootstrap'
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function AddQuestion(props) {

    const [question, setQuestion] = React.useState("")
    const [questionType, setQuestionType] = React.useState();
    const [selectedSurvey, setSelectedSurvey] = useState({ value: '', label: 'Valitse'});
    const [surveys, setSurveys] = useState([])
    const [newQuestionOptions, setNewQuestionOptions] = React.useState([{ id: 0, option: '' }])
    const [notification, setNotification] = useState(false)

    const surveyOptions = []
    
    useEffect(() => fetchData(), [])

    useEffect(() => {
        if (surveys !== "") {
            console.log("surveys", surveys)
            surveys.map(survey => surveyOptions.push({ 
                label: survey.name, 
                value: survey._links.self.href,
                id: survey.id
            }))
        }
    });

    const handleQuestionChange = (event) => {
        setQuestion({...question, [event.target.name]: event.target.value})
        console.log("lomake", question)
    }

    const handleSelectedSurveyChange = (event) => {
        console.log("event", event)
        setSelectedSurvey(event)
    }

    //console.log('selectedSurvey', selectedSurvey)
    //console.log('surveyOptions', surveyOptions)
    
    const fetchData = () => {
        fetch('https://team4back.herokuapp.com/api/surveys')
        .then(response => response.json())
        .then(data => {
            setSurveys(data._embedded.surveys)
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("question", question)
        let questionBody = {}

        if (questionType === 1 || questionType === 2) {

            const optionsList = newQuestionOptions.filter(item => item.option.length > 0)

            questionBody = { 
                "question": question.question, 
                "type": questionType, 
                "surveyId" : selectedSurvey.id, 
                "options": optionsList
            }
            
            console.log("question body", questionBody)

        } else {
            questionBody = { 
                "question": question.question, 
                "type": questionType, 
                "surveyId" : selectedSurvey.id 
            }
            console.log("question body", questionBody)
        }
 
        if (!selectedSurvey) {
            alert("Ennen kysymyksen tallentamista pitää valita kysely!")
            return;
        }
        
        const response = await fetch('http://team4back.herokuapp.com/addQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionBody)
        })

        try {
            const data = await response
            setQuestion({...question, 'question':''})
            setNewQuestionOptions([{ id: 0, option: '' }])
            setNotification(true)
            return console.log(data)
        } catch (err) {
            throw err
        }
    }
    
    //console.log('newQuestionOptions', newQuestionOptions)

    const handleNewQuestionOptionsChange = (item, event) => {
        console.log(event.target.value)
        console.log(item)
        const changedOption = { ...item, option: event.target.value }
        console.log('changed option', changedOption)
        setNewQuestionOptions(newQuestionOptions.map(item => item.id !== changedOption.id ? item : changedOption))
    }

    const addNewOption = e => {
        e.preventDefault()
        setNewQuestionOptions([ ...newQuestionOptions, { id: Math.floor(Math.random() * 10000), option: '' } ])
    }

    const removeNewOption = (item, event) => {
        console.log('removeNewOption event', event)
        console.log('removeNewOption item', item)
        setNewQuestionOptions(newQuestionOptions.filter(option => option.id !== item.id))
    }

    console.log('newQuestionOptions', newQuestionOptions)


    return  (
        <Container fluid={"xl"} className="BodyContainer add-question-component">
            <Row>
                <Col md={8}>

                <h1 className="main-h1">Lisää kysymyksiä</h1>

                <h3>Valitse kysely, johon lisätään uusia kysymyksiä</h3>
                
                <Select
                    className="select-survey"
                    value={selectedSurvey}
                    onChange={handleSelectedSurveyChange}
                    options={surveyOptions}
                    placeholder='Valitse vaihtoehto'
                />

                {selectedSurvey.value.length > 1 ?
                    <div className="mb-4">
                        <h3 className="mt-5 mb-3">Valitse kysymyksen tyyppi</h3>
                        <button type="button" className="btn btn-info mx-2" onClick={() => setQuestionType(1)}>Radio</button>
                        <button type="button" className="btn btn-info mx-2" onClick={() => setQuestionType(2)}>Checkbox</button>
                        <button type="button" className="btn btn-info mx-2" onClick={() => setQuestionType(3)}>Input Field</button>
                    </div>
                : null }

                { questionType ?
                    <div>
                        <h3 className="mt-5 mb-3">Lisää uusi kysymys</h3>
                        { notification ?
                            <Alert variant='success' onClose={() => setNotification(false)} dismissible>
                                Uusi kysymys lisätty
                            </Alert> 
                        : null }
                        <form className="add-radio-form" onSubmit={handleSubmit}>
                            <label for="question">Kysymys</label> <br />
                            <input type="text" className="form-control" id="1" name="question" value={question.question} onChange={handleQuestionChange} />
                            <br /><br />

                            
                            { questionType !== 3 ? 
                                <div>
                                    <label for="question">Vaihtoehdot</label>
                                    {newQuestionOptions.map(item => 
                                        <InputGroup className="mb-3">
                                            <Form.Control type='text' value={item.option} onChange={(e) => handleNewQuestionOptionsChange(item, e)} />
                                            {newQuestionOptions.length > 1 ? 
                                            <InputGroup.Append>
                                                <Button variant="warning" onClick={(e) => removeNewOption(item, e)}>Poista</Button>
                                            </InputGroup.Append>
                                            : null }
                                            
                                        </InputGroup>
                                    )}
                                    <Button variant="outline-info" onClick={addNewOption}>Lisää vaihtoehto</Button>
                                </div>

                                
                            : null }
                            <input type="submit" className="btn btn-primary mt-3" value="Lähetä" />
                        </form>
                    </div>
                : null }

                </Col>
            </Row>

    </Container>
    )
}