import React from 'react';
import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import SurveyEdit from './SurveyEdit';
import { Table, Row, Container, Col } from 'react-bootstrap'

const SurveyList = (props) => {
  const [show, setShow] = useState(false);
  const [buttonColor, setButtonColor] = useState(false);
  const [surveys, setSurveys] = useState([])
  const [rendering, setRendering] = useState(false)

  useEffect(() => fetchData(), [props.adding])
  useEffect(() => {
    if (props.adding===true && surveys !== "") {

        console.log("surveys", surveys);
        props.setAdding(false)
    }
  }
  );

  useEffect(() => fetchData(), [rendering])
  useEffect(() => {
    if (rendering===true && surveys !== "") {

        console.log(surveys, "surveys");
        setRendering(false)
    }
  }
  );

  const fetchData = () => {
    fetch('https://team4back.herokuapp.com/api/surveys')
      .then(response => response.json())
      .then(data => setSurveys(data._embedded.surveys))
  }

  const deleteSurvey = (event) => {
    console.log("id", event.target.id)
    if(window.confirm('Haluatko varmasti poistaa tämän kyselyn?')){
    fetch(event.target.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
      }) 

      console.log("deleted", surveys)
      setRendering(true)
    }
  }

  const [uniqueEdit, setUniqueEdit] = useState({});
  function ShowAndUnique(event){
    setShow(!show)
    setUniqueEdit(event.target.id)
    setButtonColor(!buttonColor)
  }

  return( 
  <Row>
    <Col md={12}>
    <Table responsive>
    
      <th>Kyselyt</th>

      <tbody>
      <tr className="survey-tr">
        {surveys.map( (item,i) => <td key={i} className="survey-td"><div className="surveyName">{item.name}</div>
        <div className="surveyListControls">
        {item._links.self.href===uniqueEdit ? (show && <SurveyEdit id={item._links.self.href} name={item.name} render={setRendering} />):(null)}
            <button 
              variant="link" 
              className={buttonColor===true && item._links.self.href===uniqueEdit ? "btn btn-warning" : "btn btn-primary"} 
              style={buttonColor===true && item._links.self.href===uniqueEdit ? {paddingLeft:27, paddingRight:27} : null}
              name={item.name} 
              id={item._links.self.href} 
              value="edit"
              onClick={ShowAndUnique}
              > 
            
            {buttonColor===true && item._links.self.href===uniqueEdit ? "Sulje" : "Muokkaa"}
            </button>

            <input variant="link" 
              className="btn btn-danger"
              style={{marginLeft: 30}} 
              id={item._links.self.href} 
              type="button" 
              value="Poista" 
              onClick={deleteSurvey} 
              />
            
        </div>
        </td> )}
      </tr> 
      </tbody>
    </Table>
    </Col>
  </Row>
  )
    
}
export default SurveyList