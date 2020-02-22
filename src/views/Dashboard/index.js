import React, { useState } from 'react';
import './components/styles.css';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import Recommended from './components/Recommended';
import Explore from './components/Explore';
import MyStudio from './components/MyStudio';
import AddStudioForm from './components/AddStudioForm';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const { url, path } = useRouteMatch();
  const addStudioForm = () => {
    if (showForm) {
      return <AddStudioForm />;
    }
    return;
  };
  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const linkActive = path => {
    if (
      window.location.pathname.split('/')[
        window.location.pathname.split('/').length - 1
      ] === path
    ) {
      return 'nav-link text-reddish';
    }
    return 'nav-link';
  };

  const linkActiveDiv = path => {
    if (
      window.location.pathname.split('/')[
        window.location.pathname.split('/').length - 1
      ] === path
    ) {
      return (
        <div
          style={{
            width: '20px',
            height: '20px',
            position: 'absolute',
            background:
              'linear-gradient(90deg, rgba(243,0,93,1) 0%, rgba(243,0,93,0.5) 35%, rgba(243,0,93,0) 100%)',
            left: 0,
          }}
        ></div>
      );
    }
    return;
  };

  return (
    <>
      <div className='dash-container'>
        <div className='dash-side-bar'>
          <h1 className='text-lobster text-white dash-logo'>MusicHub</h1>
          <div className='dash-nav'>
            <Link className={linkActive('dashboard')} to={`${url}`}>
              <ReactCSSTransitionGroup
                transitionName='example'
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {linkActiveDiv('dashboard')}
              </ReactCSSTransitionGroup>
              Home
            </Link>
            <Link
              className={linkActive('recommended')}
              to={`${url}/recommended`}
            >
              <ReactCSSTransitionGroup
                transitionName='example'
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {linkActiveDiv('recommended')}
              </ReactCSSTransitionGroup>
              Recommended
            </Link>
            <Link className={linkActive('explore')} to={`${url}/explore`}>
              <ReactCSSTransitionGroup
                transitionName='example'
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {linkActiveDiv('explore')}
              </ReactCSSTransitionGroup>
              Explore
            </Link>
            <Link className={linkActive('my-studios')} to={`${url}/my-studios`}>
              <ReactCSSTransitionGroup
                transitionName='example'
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {linkActiveDiv('my-studios')}
              </ReactCSSTransitionGroup>
              My Studios
            </Link>
          </div>
        </div>
        <main className='dash-main'>
          <button className='dash-add-btn' onClick={handleShowForm}>
            Add Studio
          </button>
          <ReactCSSTransitionGroup
            transitionName='example'
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {addStudioForm()}
          </ReactCSSTransitionGroup>
          <div className='dash-content'>
            <Switch>
              <Route exact path={path}>
                <h3>Welcome</h3>
              </Route>
              <Route path={`${path}/recommended`}>
                <Recommended />
              </Route>
              <Route path={`${path}/explore`}>
                <Explore />
              </Route>
              <Route path={`${path}/my-studios`}>
                <MyStudio />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
