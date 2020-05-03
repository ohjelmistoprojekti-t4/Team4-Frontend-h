import React from 'react'
import {useState, useEffect} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function AddQuestion(props) {

    const [question, setQuestion] = React.useState("")
    const [options, setOptions] = React.useState("")
    const [questionType, setQuestionType] = React.useState(null);
    
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [surveys, setSurveys] = useState([])

    const surveyOptions = []
    
    useEffect(() => fetchData(), [])

    useEffect(() => {
        if (surveys !== "") {
            console.log("surveys", surveys)
            surveys.map(survey => surveyOptions.push({value: survey._links.self.href, label: survey.name}))
        }
    });

    const handleQuestionChange = (event) => {
        setQuestion({...question, [event.target.name]: event.target.value})
        console.log("lomake", question)
    };

    const handleOptionsChange = (event) => {
        setOptions({...options, [event.target.name]: event.target.value})
        console.log("Options lomake", options)
    };

    const handleSelectedSurveyChange = (event) => {
        console.log("event", event)
        setSelectedSurvey(event.value)
    };

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

        const surveyId = parseInt(selectedSurvey.split('/').slice(-1)[0])
           
        questionBody = { 
            "question": question.question, 
            "type": questionType, 
            "surveyId" : surveyId, 
            "options": [] 
        }

        if (questionType === 1 || questionType === 2) {

            var optionsArr = options.options.split(',').map(item => item.trim());
            console.log('optionsArr.options', optionsArr);
            optionsArr.forEach(item => {
                if (item.length > 0) {
                    var newOption = { "option": item }
                    questionBody.options.push(newOption) 
                }
            })
            console.log("questin body", questionBody)

        } else {
            questionBody = { 
                "question": question.question, 
                "type": questionType, 
                "surveyId" : surveyId, 
                "options": [] 
            }
            console.log("questin body", questionBody)
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
        
        setQuestion({...question, "question":"", "options":""})

        try {
            const data = await response.json()
            return data
        } catch (err) {
            throw err
        }
    }

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
                    placeholder="Valitse kysely..."
                />

                {selectedSurvey ?
                    <div>
                        <h3 class="mt-5 mb-3">Valitse kysymyksen tyyppi</h3>
                        <button type="button" class="btn btn-info mx-2" onClick={() => setQuestionType(1)}>Radio</button>
                        <button type="button" class="btn btn-info mx-2" onClick={() => setQuestionType(2)}>Checkbox</button>
                        <button type="button" class="btn btn-info mx-2" onClick={() => setQuestionType(3)}>Input Field</button>
                    </div>
                : null }

                { questionType ?
                    <div>
                        <h3 class="mt-5 mb-3">Lisää uusi kysymys</h3>
                        <form className="add-radio-form" onSubmit={handleSubmit}>
                            <label for="question">Kysymys:</label> <br />
                            <input type="text" class="form-control" id="1" name="question" value={question.question} onChange={handleQuestionChange} />
                            <br /><br />

                            
                            { questionType !== 3 ? 
                                <div>
                                    <label for="options">Kirjaa vaihtoehdot (Erota pilkulla):</label> <br />
                                    <textarea class="form-control" rows="10" type="text" id="2" name="options" value={question.options} onChange={handleOptionsChange} />
                                </div>
                            : null }
                            <input type="submit" class="btn btn-primary mt-3" value="Lähetä" />
                        </form>
                    </div>
                : null }

                </Col>
            </Row>

    </Container>
    )
}