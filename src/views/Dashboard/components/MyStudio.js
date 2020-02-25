import React from 'react'
import StudioCard from '../components/StudioCard'
import { useSelector } from 'react-redux'

const MyStudio = (props) => {
  const { myRooms, loading, error } = props

  if (loading) return <p className='text-center mt-5'>Loading...</p>
  if (error) return <p className='text-center mt-5'>Error...</p>
  return (
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
  )
}

export default MyStudio
