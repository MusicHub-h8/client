import React from 'react';
import { useDispatch } from 'react-redux';
import { requestAcceptInvitation } from '../../../store/actions';

const NotificationCard = props => {
  const dispatch = useDispatch();
  const { music_title, _id: roomId } = props.pending;
  const { userId } = props;
  const handleAccept = () => {
    dispatch(requestAcceptInvitation(roomId, userId));
  };
  return (
    <div>
      <p>{music_title}</p>
      <button onClick={() => handleAccept()}>Accept</button>
    </div>
  );
};

export default NotificationCard;
