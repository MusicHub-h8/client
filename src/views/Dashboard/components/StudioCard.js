import React from 'react';
import './styles.css';
import { useHistory } from 'react-router-dom';

const StudioCard = props => {
  const history = useHistory();
  const { _id, music_title, description, roomOwner } = props.studio;
  const goToStudio = roomId => {
    history.push('/room/' + roomId);
  };
  return (
    <div className='card-studio' onClick={() => goToStudio(_id)}>
      <p>
        <strong>{music_title}</strong>
      </p>
      <p>{description}</p>
      <p>{roomOwner}</p>
      {props.ownership ? <p>Owned</p> : <p>Involved</p>}
    </div>
  );
};

export default StudioCard;
