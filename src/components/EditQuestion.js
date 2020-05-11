import React from 'react'
import {useState, useEffect} from 'react'
import { Container, Row, Col, Table, Modal, Button, Form, Alert } from 'react-bootstrap'
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function EditQuestion(props) {

    const [editableQuestion, setEditableQuestion] = React.useState('')
    const [editableQuestionOptions, setEditableQuestionOptions] = React.useState([])


    const [show, setShow] = useState(false)
    const [notification, setNotification] = useState(false)
    
    const [selectedSurvey, setSelectedSurvey] = useState({ value: '', label: 'Valitse kysely...'})
    const [surveys, setSurveys] = useState([])
    const [surveyQuestions, setSurveyQuestions] = useState([])

    const surveyOptions = []

    useEffect(() => {
        if (surveys !== '') {
            surveys.map(survey => surveyOptions.push({ 
                value: survey._links.self.href, 
                label: survey.name, 
                id: survey.id
            }))
        }
    })

    const fetchData = () => {
        fetch('https://team4back.herokuapp.com/api/surveys')
        .then(response => response.json())
        .then(data => {
            setSurveys(data._embedded.surveys)
        })
    }

    useEffect(() => fetchData(), [])

    const fetchQuestionData = (id) => {
        fetch(`https://team4back.herokuapp.com/api/surveys/${id}/questions`)
        .then(response => response.json())
        .then(data => setSurveyQuestions(data._embedded.questions))
    }

    const handleClose = () => setShow(false)

    const handleShow = (item) => {
        console.log('item', item)
        fetch(`https://team4back.herokuapp.com/api/questions/${item.id}/options`)
        .then(response => response.json())
        .then( data => setEditableQuestionOptions(data._embedded.options))
        setShow(true)
        setEditableQuestion(item)
    }

    
    const handleEditableQuestionChange = (event) => {
        console.log(event.target.value)
        setEditableQuestion({ ...editableQuestion, question: event.target.value })
    }

    const handleEditableQuestionOptionsChange = (item, event) => {
        console.log(event.target.value)
        console.log(item)
        const changedOption = { ...item, option: event.target.value }
        console.log('changed option', changedOption)
        setEditableQuestionOptions(editableQuestionOptions.map(note => note.optionid !== changedOption.optionid ? note : changedOption))
    }

    //console.log('editableQuestionOptions', editableQuestionOptions)

    const handleSelectedSurveyChange = (event) => {
        console.log('handleSelectedSurveyChange event', event)
        setSelectedSurvey(event)
        fetchQuestionData(event.id)
    }

    const handleSubmitEdit = async (event) => {
        event.preventDefault()
        let questionBody = {}
           
        questionBody = { 
            'question': editableQuestion.question, 
            'type': editableQuestion.type,
            'survey': { 
                'id': selectedSurvey.id, 
                'name': selectedSurvey.name 
            }
        }

        console.log('handleSubmitEdit questionBody', questionBody)
 
        if (!selectedSurvey) {
            alert('Ennen kysymyksen tallentamista pitää valita kysely!')
            return;
        }

        console.log('handleSubmitEdit editableQuestion', editableQuestion.id)

        const response = await fetch(`https://team4back.herokuapp.com/api/questions/${editableQuestion.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionBody)
        })
        
        try {
            await response.json().then(
                data => {
                    console.log('handleSubmitEdit data', data)
                    setSurveyQuestions(surveyQuestions.map(question => question.id !== editableQuestion.id ? question : data))
                }
            )
            setNotification(true)
            return console.log('handleSubmitEdit', response)
        } catch (err) {
            throw err
        }
    }

    const handleDeleteQuestion = async (id) => {
        return fetch(`https://team4back.herokuapp.com/api/questions/${id}`, { 
            method: 'DELETE',
        })
        .then(response => console.log( 'response', response))
        .then(setSurveyQuestions(surveyQuestions.filter(question => question.id !== id)))
    }

    return  (
        <Container fluid={'xl'} className='BodyContainer add-question-component'>
            <Row>
                <Col md={8}>
                    <h1 className='main-h1'>Muokkaa kysymyksiä</h1>
                    <h3>Valitse kysely, jonka kysymyksiä muokataan</h3>
                    <Select
                        className='select-survey'
                        value={selectedSurvey}
                        onChange={handleSelectedSurveyChange}
                        options={surveyOptions}
                    />
                </Col>
            </Row>
            { selectedSurvey.value.length > 1 ?
                <Row>
                    <Table responsive>
                        <thead>
                            <tr>
                            <th>Kysymys</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {surveyQuestions.map(item =>
                                <tr key={item.id}>
                                    <td>
                                        {item.question}
                                    </td>
                                    <td>
                                        <Button variant='primary' onClick={() => handleShow(item)}>
                                            Muokkaa
                                        </Button>
                                        <Button variant="warning ml-2" onClick={()=> handleDeleteQuestion(item.id)}>
                                            Poista
                                        </Button>
                                    </td>
                                </tr>)}
                        </tbody>
                    </Table>
                </Row>
            : null }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Muokkaa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { notification ?
                        <Alert variant="success" onClose={() => setNotification(false)} dismissible>
                            Kysymys tallennettu
                        </Alert> 
                    : null }
                    <Form onSubmit={handleSubmitEdit}>
                        <Form.Group>
                            <Form.Label>Kysymys</Form.Label>
                            <Form.Control type='text' value={editableQuestion.question} onChange={handleEditableQuestionChange} />
                        </Form.Group>
                        <Form.Label>Vaihtoehdot:</Form.Label>
                        {editableQuestionOptions.map(item => 
                            <Form.Group key={item.optionid} >
                                <Form.Control type='text' value={item.option} onChange={(e) => handleEditableQuestionOptionsChange(item, e)} />
                            </Form.Group>
                        )}
                        <Form.Group>
                            <Button type='submit' className='btn btn-primary mt-3'>Lähetä</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    )
}