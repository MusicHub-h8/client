import React from "react";
import "./App.css";
import HomeView from "./views/Home";
import DashboardView from "./views/Dashboard";
import JammingStudio from "./views/JammingStudio";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import io from "socket.io-client";
window.socket = io("http://localhost:4000/");

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/room/:roomId">
          <JammingStudio />
        </Route>
        <Route path="/dashboard">
          <DashboardView />
        </Route>
        <Route exact path="/">
          <HomeView />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
