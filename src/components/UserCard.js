import React, { useState } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import InviteModal from '../views/Dashboard/components/InviteModal';

const UserCard = props => {
  const { player } = props;
  const [showModal, setShowModal] = useState(false);
  const inviteUser = userId => {
    if (showModal) {
      return <InviteModal userId={userId} handleShowModal={handleShowModal} />;
    }
    return;
  };
  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const userName = () => {
    const name = player.display_name.split(' ');
    return name[0];
  };
  return (
    <>
      <ReactCSSTransitionGroup
        transitionName='example'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
      >
        {inviteUser(player._id)}
      </ReactCSSTransitionGroup>

      <div className='card-recommended'>
        <div className='card-left'>
          <img src={player.avatar} alt='Player Avatar' />
        </div>
        <div className='card-right'>
          <div className='card-right-top'>
            <p className='card-name'>{userName()}</p>
            <p>{player.genre}</p>
            <button onClick={() => handleShowModal()} className='btn-invite'>
              Invite
            </button>
          </div>
          <div className='card-right-bottom'>
            {player.instruments.map((instrument, index) => {
              return (
                <p
                  key={'instrument' + index}
                  style={{ marginRight: '8px', color: '#fa5a97' }}
                >
                  {instrument}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
