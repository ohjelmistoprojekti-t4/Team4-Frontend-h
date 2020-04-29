import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navigation from './components/Navigation';
import Questions from './components/Questions';
import Results from './components/Results';
import './App.css';
import AddRadioQuestion from './components/AddRadioQuestion';
import AddSurvey from './components/AddSurvey';

function App() {

  return (
    <>
      <Router>
        <Navigation />
        <Switch>
        
          <Route path="/questions" component={Questions} />
          <Route path="/results" component={Results} />
          <Route path="/addradioquestion" component={AddRadioQuestion} />
          <Route path="/addsurvey" component={AddSurvey} />
          <Redirect from="/" to="/questions"/>
                
        </Switch>
      </Router>
      
    </>
  );
}

export default App;
