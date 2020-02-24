import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestCurrentUser } from '../../../store/actions';
import AddInstrumentForm from '../components/AddInstrumentForm';
import './styles.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
    console.log(currentUser, 'currentUser on instrumentsContent');
    if (currentUser.instruments.length > 0) {
      return <p>{JSON.stringify(currentUser.instruments)}</p>;
    }
    return (
      <button className='dash-add-btn' onClick={handleShowForm}>
        Add Instruments
      </button>
    );
  };

  return (
    <>
      <div className='container-profile-left'>
        <p>Name</p>
        <p>Email Address</p>
        <p>Genre</p>
      </div>
      <div className='container-profile-right'>
        <p>{currentUser.display_name}</p>
        <p>{currentUser.email}</p>
        <p>{currentUser.genre}</p>
      </div>
      <div className='container-profile-instruments'>
        <h5>Instruments</h5>
        {instrumentsContent()}
        <ReactCSSTransitionGroup
          transitionName='example'
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {addStudioForm()}
        </ReactCSSTransitionGroup>
      </div>
    </>
  );
};

export default Profile;
