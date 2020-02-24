import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  requestRooms,
  setLoading,
  requestCurrentUser
} from "../../store/actions";
import "./components/styles.css";
import {
  Link,
  Switch,
  Route,
  useRouteMatch,
  useHistory
} from "react-router-dom";
import Recommended from "./components/Recommended";
import Explore from "./components/Explore";
import MyStudio from "./components/MyStudio";
import Notifications from "./components/Notifications";
import AddStudioForm from "./components/AddStudioForm";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const Dashboard = () => {
  const history = useHistory();
  const [showForm, setShowForm] = useState(false);
  const { url, path } = useRouteMatch();

  const dispatch = useDispatch();
  const myRooms = useSelector(state => state.roomReducer.myRooms);
  const loading = useSelector(state => state.roomReducer.loading);
  const error = useSelector(state => state.roomReducer.error);

  useEffect(() => {
    dispatch(requestCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(requestRooms());
  }, [dispatch]);

  const addStudioForm = () => {
    if (showForm) {
      return <AddStudioForm handleShowForm={handleShowForm} />;
    }
    return;
  };
  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const linkActive = path => {
    if (
      window.location.pathname.split("/")[
        window.location.pathname.split("/").length - 1
      ] === path
    ) {
      return "nav-link text-reddish";
    }
    return "nav-link";
  };

  const linkActiveDiv = path => {
    if (
      window.location.pathname.split("/")[
        window.location.pathname.split("/").length - 1
      ] === path
    ) {
      return (
        <div
          style={{
            width: "20px",
            height: "20px",
            position: "absolute",
            background:
              "linear-gradient(90deg, rgba(243,0,93,1) 0%, rgba(243,0,93,0.5) 35%, rgba(243,0,93,0) 100%)",
            left: 0
          }}
        ></div>
      );
    }
    return;
  };

  const userLogout = () => {
    localStorage.clear();
    history.push("/");
  };
  return (
    <>
      <div className="dash-container">
        <div className="dash-side-bar">
          <h1 className="text-lobster text-white dash-logo">MusicHub</h1>
          <div className="dash-nav">
            <Link className={linkActive("dashboard")} to={`${url}`}>
              <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {linkActiveDiv("dashboard")}
              </ReactCSSTransitionGroup>
              Home
            </Link>
            <Link
              className={linkActive("recommended")}
              to={`${url}/recommended`}
            >
              <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {linkActiveDiv("recommended")}
              </ReactCSSTransitionGroup>
              Recommended
            </Link>
            <Link className={linkActive("explore")} to={`${url}/explore`}>
              <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {linkActiveDiv("explore")}
              </ReactCSSTransitionGroup>
              Explore
            </Link>
            <Link className={linkActive("my-studios")} to={`${url}/my-studios`}>
              <ReactCSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
              >
                {linkActiveDiv("my-studios")}
              </ReactCSSTransitionGroup>
              My Studios
            </Link>
          </div>
        </div>
        <main className="dash-main">
          <div className="container-btn">
            <button className="dash-add-btn" onClick={handleShowForm}>
              Add Studio
            </button>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                className="cursor-pointer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "30px",
                  width: "25px",
                  position: "relative",
                  marginRight: "2rem"
                }}
              >
                <Link to={`${url}/notifications`}>
                  <i className="fas fa-circle"></i>
                  <i className="fas fa-bell"></i>
                </Link>
              </div>
              <button className="btn-logout" onClick={() => userLogout()}>
                Logout
              </button>
            </div>
          </div>
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {addStudioForm()}
          </ReactCSSTransitionGroup>
          <div className="dash-content">
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
  );
};

export default Dashboard;
