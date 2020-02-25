import React, { useState } from 'react';
import StudioCard from '../components/StudioCard';

const MyStudio = props => {
  const [currentPage, setCurrentPage] = useState('owned');
  const { myRooms, loading, error } = props;

  const handleChangePage = page => {
    setCurrentPage(page);
  };

  const btnStyle = page => {
    if (currentPage === page) {
      return 'bg-reddish';
    }
    return;
  };

  const studioList = () => {
    if (currentPage === 'owned') {
      return myRooms.owned.map(studio => (
        <StudioCard key={studio._id} studio={studio} ownership={true} />
      ));
    }
    return myRooms.involved.map(studio => (
      <StudioCard key={studio._id} studio={studio} ownership={false} />
    ));
  };

  if (loading) return <p className='text-center mt-5'>Loading...</p>;
  if (error) return <p className='text-center mt-5'>Error...</p>;
  return (
    <>
      <div style={{ marginBottom: '12px' }}>
        <button
          className={'btn-studio-left ' + btnStyle('owned')}
          onClick={() => handleChangePage('owned')}
        >
          Owned
        </button>
        <button
          className={'btn-studio-right ' + btnStyle('involved')}
          onClick={() => handleChangePage('involved')}
        >
          Involved
        </button>
      </div>
      {studioList()}
    </>
  );
};

export default MyStudio;
