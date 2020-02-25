import React from 'react';
import './styles.css';
import { useHistory } from 'react-router-dom';

const StudioCard = props => {
  const history = useHistory();
  const { _id, music_title, description, roomOwner } = props.studio;
  const goToStudio = roomId => {
    history.push('/room/' + roomId);
  };
  console.log(props, 'props from StudioCard');
  return (
    <div className='card-studio' onClick={() => goToStudio(_id)}>
      <p style={{ fontSize: '24px' }}>
        <strong>{music_title}</strong>
      </p>
      <p style={{ fontSize: '20px', color: '#67acca' }}>{description}</p>
      {props.ownership ? (
        <p style={{ marginBottom: 0, color: '#ff86b5' }}>Owned</p>
      ) : (
        <p style={{ marginBottom: 0, color: '#ff86b5' }}>
          Involved - {roomOwner.display_name}
        </p>
      )}
    </div>
  );
};

export default StudioCard;
