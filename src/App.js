import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navigation from './components/Navigation';
import SelectAndStart from './components/SelectAndStart';
import Questions from './components/Questions';
import Results from './components/Results';
import AddQuestion from './components/AddQuestion';
import AddSurvey from './components/AddSurvey';
import './App.css';

function App() {

  return (
    <>
      <Router>
        <Navigation />
        <Switch>
        
          <Route path="/start" component={SelectAndStart} /> 
          <Route path="/results" component={Results} />
          <Route path="/addquestion" component={AddQuestion} />
          <Route path="/addsurvey" component={AddSurvey} />
          <Redirect from="/" to="/start"/>
                
        </Switch>
      </Router>
      
    </>
  );
}

export default App;
