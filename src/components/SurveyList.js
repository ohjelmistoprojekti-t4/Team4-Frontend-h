import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from '@testing-library/react';
import { Container, Row, Col } from 'react-bootstrap';
import SurveyEdit from './SurveyEdit';

export default function SurveyList(props) {

  function deleteSurvey(event){
    event.preventDefault()
    console.log("id", event.target.id)
      if(window.confirm('Haluatko varmasti poistaa tämän kyselyn?')){
  
      fetch(event.target.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
      }) 
      }
      window.location.reload(false);
    }
    const renderEdit = (event) => {
      render ( 
        <Container fluid={"xl"} className="BodyContainer">
          <Row>
            <Col lg={10}>
              <SurveyEdit id={event.target.id} name={event.target.name} />  
            </Col>
          </Row>
        </Container>
    )
  }

    function objectMap(object, mapFn) {
        return Object.keys(object).reduce(function(result, key) {
          result[key] = mapFn(object[key])
          return result
        }, {})
    }
    let listSurveys = [];

    objectMap(props.surveys, function(value) {
        listSurveys.push(value);
    })
    console.log("surveys", listSurveys);
  
    return(
        <ul className="survey-li">
          {listSurveys.map( (item,i) => <li key={i} className="survey-li">{item.name}
          <input class="btn btn-primary" name={item.name} id={item._links.self.href} type="button" value="Edit" 
         />

          <input class="btn btn-primary" id={item._links.self.href} type="button" value="Delete" onClick={deleteSurvey} />
          </li> )}
        </ul>
      )

}