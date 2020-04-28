import React from 'react'
import {useState, useEffect} from 'react'

const AnswerOptions = (props) => {

  const [options, setOptions] = useState([])

  useEffect(() => fetchData(), [])

  const fetchData = () => {
      fetch(props.link + '/options')
      .then(response => response.json())
      .then(data => setOptions(data._embedded.options))
  }
  
  function objectMap(object, mapFn) {
    return Object.keys(object).reduce(function(result, key) {
      result[key] = mapFn(object[key])
      return result
    }, {})
  }

  let optionsArr = [];

  objectMap(options, function(value) {
      optionsArr.push(value);
  })

  function renderOptions(type) {
    switch(type) {
      case 1:
        return optionsArr.map( (item,i) => <li key={i}>
          <input type="radio" id={item._links.self.href} name={props.link} value={item.option} />
          <label>{item.option}</label>
          </li> );
        
      case 2:
        return optionsArr.map( (item,i) => <li key={i}>
        <input type="checkbox" id={item._links.self.href} name={props.link} value={item.option} />
        <label>{item.option}</label>
        </li> );
      default:
        return <input type="text" name={props.link} id="input1" data-question={props.link}></input>;
    }
  }


    return(
        <>
            {renderOptions(props.type)}
        </>
      )
 
    
}
export default AnswerOptions




    
