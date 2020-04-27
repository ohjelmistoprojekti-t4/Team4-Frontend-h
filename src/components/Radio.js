import React from 'react'

const Radio = (props) => {

  const answers = props.options;
    console.log(answers);

    function objectMap(object, mapFn) {
        return Object.keys(object).reduce(function(result, key) {
          result[key] = mapFn(object[key])
          return result
        }, {})
    }

    let answersArr = [];

    let newObject = objectMap(answers, function(value) {
        answersArr.push(value)
    })

    return(
        <>
            {answersArr.map((item,i) => <li key={i}>{item}</li>)}
        </>
      )

    
}
export default Radio




    
