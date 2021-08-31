import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

const App = () => {
  return(
    <Router>
      <div>
        <Switch>
          <Route component={Home} path="/" exact/>
          <Route component={Dashboard} path="/dashboard" />
        </Switch>
      </div>
    </Router>
  );
}


export default App;