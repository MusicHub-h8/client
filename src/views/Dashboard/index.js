import React from 'react';
import './components/styles.css';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import Recommended from './components/Recommended';
import Explore from './components/Explore';

const Dashboard = () => {
  const { url, path } = useRouteMatch();
  return (
    <>
      <div className='dash-container'>
        <div className='dash-side-bar'>
          <h1 className='text-lobster text-white dash-logo'>MusicHub</h1>
          <div className='dash-nav'>
            <Link className='nav-link' to={`${url}`}>
              Home
            </Link>
            <Link className='nav-link' to={`${url}/recommended`}>
              Reccomended
            </Link>
            <Link className='nav-link' to={`${url}/explore`}>
              Explore
            </Link>
            <Link className='nav-link' to={`${url}/my-studio`}>
              My Studio
            </Link>
          </div>
        </div>
        <main className='dash-main'>
          <button className='dash-add-btn'>Add Studio</button>
          <div className='dash-content'>
            <Switch>
              <Route exact path={path}>
                <h3>Please select a topic.</h3>
              </Route>
              <Route path={`${path}/recommended`}>
                <Recommended />
              </Route>
              <Route path={`${path}/explore`}>
                <Explore />
              </Route>
              <Route path={`${path}/my-studio`}>
                <h1>My Studio</h1>
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
