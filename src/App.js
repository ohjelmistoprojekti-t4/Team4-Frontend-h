import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Navigation from './components/Navigation';
import SelectAndStart from './components/SelectAndStart'
import Results from './components/Results'
import './App.css'
import AddQuestion from './components/AddQuestion'
import AddSurvey from './components/AddSurvey'
import EditQuestion from './components/EditQuestion'

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    handleUser()
  }, [])

  const handleUser = () => {
    const loggedUserJSON = window.localStorage.getItem('questionAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('logged user found', user)
      setUser(user)
    } else {
      setUser(null)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('questionAppUser')
    handleUser()
  }

  return (
    <>
      <Router>
        <Navigation user={user} handleUser={handleUser} handleLogout={handleLogout} />
        <Route exact path="/" render={() =>
          <Redirect to="/start" />
        } />
        <Route path="/start" render={() =>
          <SelectAndStart />
        } />
        <Route path="/results" render={() =>
          user ? <Results /> : <Redirect to="/" />
        } />
        <Route path="/addsurvey" render={() =>
          user ? <AddSurvey /> : <Redirect to="/" />
        } />
        <Route path="/addquestion" render={() =>
          user ? <AddQuestion /> : <Redirect to="/" />
        } />
        <Route path="/editquestion" render={() =>
          user ? <EditQuestion /> : <Redirect to="/" />
        } />
      </Router>
    </>
  )
}

export default App;