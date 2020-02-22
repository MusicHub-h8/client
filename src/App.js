import React from 'react';
import './App.css';
import HomeView from './views/Home';
import DashboardView from './views/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/room/:roomId'>
          <h1>Test</h1>
          {/* <JammingStudio /> */}
        </Route>
        <Route path='/dashboard'>
          <DashboardView />
        </Route>
        <Route path='/'>
          <HomeView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
