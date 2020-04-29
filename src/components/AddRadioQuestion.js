import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'

export default function AddRadioQuestion(props) {
    const [radioQuestion, setRadioQuestion] = React.useState({
        question: '', option1: '', option2: '', option3: ''
    })
    

  const handleInputChange = (event) => {
    setRadioQuestion({...radioQuestion, [event.target.name]: event.target.value})
    console.log("lomake", radioQuestion)
  }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("lomake", radioQuestion)

        const questionBody = { "question": radioQuestion.question, "type": 1 }
        
        const response = await fetch('https://team4back.herokuapp.com/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questionBody)
        })
        
        
        try {
            const data = await response.json()
            console.log(data._links.question)

            const optionsList = [ radioQuestion.option1, radioQuestion.option2, radioQuestion.option3 ]
            optionsList.forEach( async item => {

                if (item.length > 0) {
                    const questionOption = { 
                        "option": item, 
                        "refOptionQuestion": data._links.question.href 
                    }
                    const responseOpt = await fetch('https://team4back.herokuapp.com/api/options', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(questionOption)
                    })
    
                    const datax = await responseOpt.json()
                    console.log(datax)
                }
            })

            return data
        } catch (err) {
            throw err
        }
    }

    return  (
        <Container fluid={"xl"} className="BodyContainer add-question-component">

            <Row>
                <Col md={12}>
                <h1 className="main-h1">Lisää kysymyksiä</h1>

                <h3>Lisää uusi monivalintakysymys (radio)</h3>
                <form className="add-radio-form" onSubmit={handleSubmit}>
                    <label for="question">Radio Kysymys:</label> <br />
                    <input type="text" id="1" name="question" value={radioQuestion.question} onChange={handleInputChange} />
                    <br /><br />

                    <label for="option1">Vaihtoehto 1</label> <br />
                    <input type="text" id="2" name="option1" value={radioQuestion.option1} onChange={handleInputChange} />
                    <br />

                    <label for="option2">Vaihtoehto 2</label> <br />
                    <input type="text" id="3" name="option2" value={radioQuestion.option2} onChange={handleInputChange} />
                    <br />

                    <label for="option3">Vaihtoehto 3</label> <br />
                    <input type="text" id="4" name="option3" value={radioQuestion.option3} onChange={handleInputChange} />
                    <br />
                    <br />

                    <input type="submit" value="Lähetä" />
                </form>
                </Col>
            </Row>

    </Container>
    )
}