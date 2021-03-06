import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  requestRooms,
  setLoadingRoom,
  requestCurrentUser,
  setCurrentUser,
} from '../../store/actions'
import './components/styles.css'
import { Link, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import Recommended from './components/Recommended'
import Explore from './components/Explore'
import MyStudio from './components/MyStudio'
import Notifications from './components/Notifications'
import Profile from './components/Profile'
import AddStudioForm from './components/AddStudioForm'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Dashboard = () => {
  const socket = window.socket
  const history = useHistory()
  const [showForm, setShowForm] = useState(false)
  const { url, path } = useRouteMatch()
  const currentUser = useSelector((state) => state.userReducer.currentUser)

  const dispatch = useDispatch()
  const myRooms = useSelector((state) => state.roomReducer.myRooms)
  const loading = useSelector((state) => state.roomReducer.loading)
  const error = useSelector((state) => state.roomReducer.error)

  useEffect(() => {
    dispatch(requestCurrentUser())
    socket.on('new_invite', (user) => {
      if (user._id === currentUser._id) {
        console.log(user, 'ini dari socket dashboard')
        dispatch(setCurrentUser(user))
      }
    })
  }, [dispatch, socket])

  useEffect(() => {
    dispatch(setLoadingRoom(true))
    dispatch(requestRooms())
  }, [dispatch])

  const addStudioForm = () => {
    if (showForm) {
      return <AddStudioForm handleShowForm={handleShowForm} />
    }
    return
  }
  const handleShowForm = () => {
    setShowForm(!showForm)
  }

  const linkActive = (path) => {
    if (
      window.location.pathname.split('/')[
        window.location.pathname.split('/').length - 1
      ] === path
    ) {
      return 'nav-link text-reddish'
    }
    return 'nav-link'
  }

  const linkActiveDiv = (path) => {
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
      )
    }
    return
  }

  const userLogout = () => {
    localStorage.clear()
    history.push('/')
  }
  return (
    <>
      <div className='dash-container'>
        <ReactCSSTransitionGroup
          transitionName='example'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {addStudioForm()}
        </ReactCSSTransitionGroup>

        <div className='dash-side-bar'>
          <h1 className='text-lobster text-white dash-logo'>MusicHub</h1>
          <div className='dash-nav'>
            <Link className={linkActive('recommended')} to={`${url}/recommended`}>
              <ReactCSSTransitionGroup
                transitionName='example'
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {linkActiveDiv('recommended')}
              </ReactCSSTransitionGroup>
              Recommended Players
            </Link>
            <Link className={linkActive('explore')} to={`${url}/explore`}>
              <ReactCSSTransitionGroup
                transitionName='example'
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {linkActiveDiv('explore')}
              </ReactCSSTransitionGroup>
              All Players
            </Link>
            <Link className={linkActive('studios')} to={`${url}/studios`}>
              <ReactCSSTransitionGroup
                transitionName='example'
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {linkActiveDiv('studios')}
              </ReactCSSTransitionGroup>
              Studios
            </Link>
            <Link className={linkActive('dashboard')} to={`${url}`}>
              <ReactCSSTransitionGroup
                transitionName='example'
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {linkActiveDiv('dashboard')}
              </ReactCSSTransitionGroup>
              Profile
            </Link>
          </div>
        </div>
        <div className='container-btn'>
          <button className='dash-add-btn' onClick={handleShowForm}>
            Add Studio
          </button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              className='cursor-pointer'
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '30px',
                width: '25px',
                position: 'relative',
                marginRight: '2rem',
              }}
            >
              <Link to={`${url}/notifications`}>
                {currentUser.pendingInvites.length > 0 && (
                  <i className='fas fa-circle'></i>
                )}
                <i className='fas fa-bell cursor-pointer'></i>
              </Link>
            </div>
            <img
              src={currentUser.avatar}
              alt={currentUser.display_name}
              className='playerAva cursor-pointer'
              onClick={() => history.push('/dashboard')}
            />
            <button className='btn-logout' onClick={() => userLogout()}>
              Logout
            </button>
          </div>
        </div>
        <main className='dash-main'>
          <div className='dash-content'>
            <Switch>
              <Route exact path={path}>
                <Profile />
              </Route>
              <Route path={`${path}/recommended`}>
                <Recommended />
              </Route>
              <Route path={`${path}/explore`}>
                <Explore />
              </Route>
              <Route path={`${path}/studios`}>
                <MyStudio myRooms={myRooms} loading={loading} error={error} />
              </Route>
              <Route path={`${path}/notifications`}>
                <h1>Notifications</h1>
                <Notifications />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </>
  )
}

export default Dashboard
