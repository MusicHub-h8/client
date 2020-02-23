import React from 'react';
import { useSelector } from 'react-redux';
import './styles.css';
import axios from '../../../api/axiosInstance';

const InviteModal = props => {
  const myRooms = useSelector(state => state.roomReducer.myRooms);

  const inviteUser = studioId => {
    const access_token = localStorage.getItem('access_token');
    axios({
      method: 'POST',
      url: `/rooms/${studioId}/invite/${props.userId}`,
      headers: {
        access_token,
      },
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch(console.log);
    // console.log(studioId);
    // console.log(props);
  };

  const modalContent = () => {
    if (myRooms.owned.length > 0) {
      return myRooms.owned.map(studio => (
        <p
          className='cursor-pointer'
          onClick={() => inviteUser(studio._id)}
          key={studio._id}
        >
          {studio.music_title}
        </p>
      ));
    }
    return <p>You have no studio yet...</p>;
  };
  return (
    <div className='modal-invite'>
      <span
        className='cursor-pointer'
        style={{ alignSelf: 'flex-end' }}
        onClick={props.handleShowModal}
      >
        Cancel
      </span>
      <h3>Select Studio</h3>
      {modalContent()}
    </div>
  );
};

export default InviteModal;
