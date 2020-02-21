import React from 'react';
import './App.css';
import HomeView from './views/Home';
import DashboardView from './views/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { Widget } from 'react-chat-widget';
// import 'react-chat-widget/lib/styles.css';

function App() {
  // const handleNewUserMessage = newMessage => {
  //   console.log(`New message incoming! ${newMessage}`);
  // };

  return (
    <Router>
      {/* <Widget handleNewUserMessage={handleNewUserMessage} /> */}
      <Switch>
        {/* <Route path='/room'>
          <About />
        </Route> */}
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
