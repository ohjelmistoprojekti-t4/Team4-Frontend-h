import React from 'react';
import {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import SurveyEdit from './SurveyEdit';

const SurveyList = (props) => {
  const [show, setShow] = useState(false);
  const [buttonColor, setButtonColor] = useState(false);
  let listSurveys = [];

  const deleteSurvey = (event) => {
    
    console.log("id", event.target.id)
      if(window.confirm('Haluatko varmasti poistaa tämän kyselyn?')){
  
      fetch(event.target.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
      }) 
      .then(res => res.json())
      window.location.reload(false);
    }
    }
    

    function objectMap(object, mapFn) {
        return Object.keys(object).reduce(function(result, key) {
          result[key] = mapFn(object[key])
          return result
        }, {})
    }
    

    objectMap(props.surveys, function(value) {
        listSurveys.push(value);
    })
    console.log("surveys", listSurveys);
  
    const [uniqueEdit, setUniqueEdit] = useState({});
    function ShowAndUnique(event){
      setShow(!show)
      setUniqueEdit(event.target.id)
      setButtonColor(!buttonColor)
    }

    return( 
      <>
        <ul className="survey-li">
          {listSurveys.map( (item,i) => <li key={i} className="survey-li">{item.name}
          <button variant="link" className={buttonColor==true && item._links.self.href===uniqueEdit ? "btn btn-warning" : "btn btn-primary"} name={item.name} id={item._links.self.href} value="Edit"
           onClick={ShowAndUnique}>Muokkaa</button>

          <input variant="link" className="btn btn-danger" id={item._links.self.href} type="button" value="Poista" onClick={deleteSurvey} />
          {item._links.self.href===uniqueEdit ? (show && <SurveyEdit id={item._links.self.href} name={item.name} />):(null)}
          </li> )}
        </ul> 
        
        </>
      )
    
}
export default SurveyList