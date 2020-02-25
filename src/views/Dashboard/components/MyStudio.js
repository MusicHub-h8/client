import React, { useState } from 'react'
import StudioCard from '../components/StudioCard'
import SearchBar from './SearchBar'
const MyStudio = (props) => {
  const { myRooms, loading, error } = props
  const [result, setResult] = useState({ involved: [], owned: [] })
  if (loading) return <p className='text-center mt-5'>Loading...</p>
  if (error) return <p className='text-center mt-5'>Error...</p>
  const searchByRoomTitle = (keyword) => {
    console.log(myRooms)
    const searchOwned = myRooms.owned.filter((room) => {
      if (room.music_title.toLowerCase().startsWith(keyword.toLowerCase())) {
        return room
      }
    })

    const searchInvolved = myRooms.involved.filter((room) => {
      if (room.music_title.toLowerCase().startsWith(keyword.toLowerCase())) {
        return room
      }
    })
    console.log(searchInvolved)
    let searchResult = { involved: searchInvolved, owned: searchOwned }
    searchResult.involved.length > 0 || searchResult.owned.length > 0
      ? setResult(searchResult)
      : setResult([])
  }

  return (
    <div>
      <SearchBar searchByRoomTitle={searchByRoomTitle}></SearchBar>
      {result.involved.length === 0 && result.owned.length === 0 && (
        <>
          <div>
            {myRooms.owned.map((studio) => (
              <StudioCard key={studio._id} studio={studio} ownership={true} />
            ))}
          </div>
          <div>
            {myRooms.involved.map((studio) => (
              <StudioCard key={studio._id} studio={studio} ownership={false} />
            ))}
          </div>
        </>
      )}
      {(result.involved.length > 0 || result.owned.length > 0) && (
        <>
          <div>
            {result.owned.map((studio) => (
              <StudioCard key={studio._id} studio={studio} ownership={true} />
            ))}
          </div>
          <div>
            {result.involved.map((studio) => (
              <StudioCard key={studio._id} studio={studio} ownership={false} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default MyStudio
