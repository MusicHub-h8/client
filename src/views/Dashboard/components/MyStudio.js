import React, { useState } from 'react';
import StudioCard from '../components/StudioCard';
import SearchBar from './SearchBar';
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

  const studioListResult = () => {
    if (currentPage === 'owned') {
      return result.owned.map(studio => (
        <StudioCard key={studio._id} studio={studio} ownership={true} />
      ));
    }
    return result.involved.map(studio => (
      <StudioCard key={studio._id} studio={studio} ownership={false} />
    ));
  };

  // Bawah search
  const [result, setResult] = useState({ involved: [], owned: [] });
  if (loading) return <p className='text-center mt-5'>Loading...</p>;
  if (error) return <p className='text-center mt-5'>Error...</p>;
  const searchByRoomTitle = keyword => {
    console.log(myRooms);
    const searchOwned = myRooms.owned.filter(room => {
      if (room.music_title.toLowerCase().startsWith(keyword.toLowerCase())) {
        return room;
      }
      return null;
    });

    const searchInvolved = myRooms.involved.filter(room => {
      if (room.music_title.toLowerCase().startsWith(keyword.toLowerCase())) {
        return room;
      }
      return null;
    });
    console.log(searchInvolved);
    let searchResult = { involved: searchInvolved, owned: searchOwned };
    searchResult.involved.length > 0 || searchResult.owned.length > 0
      ? setResult(searchResult)
      : setResult([]);
  };

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
      <SearchBar searchByRoomTitle={searchByRoomTitle}></SearchBar>

      {result.involved.length === 0 && result.owned.length === 0 && (
        <>{studioList()}</>
      )}
      {(result.involved.length > 0 || result.owned.length > 0) && (
        <>{studioListResult()}</>
      )}
    </>
  );
};

export default MyStudio;
