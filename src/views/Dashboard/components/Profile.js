import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { requestCurrentUser } from "../../../store/actions";
import AddInstrumentForm from "../components/AddInstrumentForm";
import "./styles.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.userReducer.currentUser);
  useEffect(() => {
    dispatch(requestCurrentUser());
  }, [dispatch]);

  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const addStudioForm = () => {
    if (showForm) {
      return <AddInstrumentForm handleShowForm={handleShowForm} />;
    }
    return;
  };

  const instrumentsContent = () => {
    console.log(currentUser, "currentUser on instrumentsContent");
    if (currentUser.instruments.length > 0) {
      return currentUser.instruments.map(instrument => (
        <p
          key={instrument}
          style={{
            padding: "8px",
            marginBottom: 0,
            backgroundColor: "#29596e",
            borderRadius: "15px",
            marginRight: "6px",
            marginLeft: "6px",
            color: "#ff86b5"
          }}
        >
          {instrument}
        </p>
      ));
    }
    return (
      <button className="dash-add-btn" onClick={handleShowForm}>
        Add Instruments
      </button>
    );
  };

  return (
    <>
      {/* <div className='container-profile-left'>
        <p>Name</p>
        <p>Email Address</p>
        <p>Genre</p>
      </div>
      <div className='container-profile-right'>
        <p>{currentUser.display_name}</p>
        <p>{currentUser.email}</p>
        <p>{currentUser.genre}</p>
      </div> */}
      <img
        src={currentUser.avatar}
        alt="User Avatar"
        style={{
          height: "150px",
          borderRadius: "10px"
        }}
      />
      <div className="container-profile">
        <p style={{ fontSize: "24px" }}>
          <strong>{currentUser.display_name}</strong>
        </p>
        <p style={{ fontSize: "20px", color: "#67acca" }}>
          {currentUser.email}
        </p>
        <p style={{ fontSize: "20px", color: "#67acca" }}>
          {currentUser.genre}
        </p>
        <div className="container-profile-instruments">
          {/* <h5 style={{ fontWeight: 'bold' }}>Instruments</h5> */}
          {instrumentsContent()}
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {addStudioForm()}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    </>
  );
};

export default Profile;
