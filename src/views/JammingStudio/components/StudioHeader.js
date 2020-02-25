import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import FormAdd from './FormAdd'

export default function StudioHeader(props) {
  const [showForm, setShowForm] = useState(false)

  const [players, setPlayers] = useState([{ avatar: null, display_name: null }])
  const history = useHistory()

  const handleGoBack = () => {
    history.push('/dashboard/my-studios')
  }
  const toggleForm = () => {
    setShowForm(!showForm)
  }

  useEffect(() => {
    setPlayers(props.roomDetail.userIds)
  }, [props.roomDetail])

  useEffect(() => {
    console.log(players)
  }, [players])
  return (
    <>
      <div className='studio-HeaderContainer text-white'>
        <div className='studio-heading'>
          <div className='leftSide'>
            <button
              className='dash-add-btn mb-2 mr-2'
              onClick={() => {
                handleGoBack()
              }}
            >
              <i class='fas fa-chevron-left'></i>
            </button>
            <button
              className='dash-add-btn'
              onClick={(event) => {
                toggleForm()
              }}
            >
              <i class='fas fa-plus'></i> Add Track
            </button>
          </div>
          <div className='rightSide'>
            <div className='playerAvaContainer'>
              {players &&
                players.map((player) => (
                  <img
                    src={player.avatar}
                    alt={player.display_name}
                    className='playerAva'
                  />
                ))}
            </div>
          </div>
        </div>
        {showForm && <FormAdd />}
      </div>
    </>
  )
}
