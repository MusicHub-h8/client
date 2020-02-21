import React from 'react';

const UserCard = props => {
  const { player } = props;
  return (
    <>
      <div className='card-recommended'>
        <div className='card-left'>
          <img src={player.avatar} alt='Player Avatar' />
        </div>
        <div className='card-right'>
          <div className='card-right-top'>
            <p className='card-name'>{player.name}</p>
            <p>{player.genre}</p>
            <button className='btn-invite'>Invite</button>
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
