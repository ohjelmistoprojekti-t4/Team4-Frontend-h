import React from 'react'

const loginChecker = (username, password) => {
    
  const base64 = require('base-64')
  const url = 'https://team4back.herokuapp.com/authorized'
  //let username = 'Administrator'
  //let password = 'Nimda'
  let headers = new Headers()
  headers.set('Authorization', 'Basic ' + base64.encode(username + ":" + password))

  fetch(url, {
    method:'POST', 
    headers: headers
  }) 
  .then(response => console.log('loginChecker response', response))

  if (username === 'Administrator' && password === 'Nimda') {
    console.log('Login success')
    return true
  } else {
    console.log('Login failed')
    return false
  }
}

export default loginChecker