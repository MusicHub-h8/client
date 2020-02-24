import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import FormAdd from './FormAdd'

export default function StudioHeader() {
  const [showForm, setShowForm] = useState(false)

  const players = [
    'https://i.pravatar.cc',
    'https://i.pravatar.cc',
    'https://i.pravatar.cc',
    'https://i.pravatar.cc',
  ]
  const history = useHistory()

  const handleGoBack = () => {
    history.goBack()
  }

  const toggleForm = () => {
    setShowForm(!showForm)
    console.log(showForm)
  }

  return (
    <>
      <div className='studio-HeaderContainer text-white'>
        <button
          className='dash-add-btn mb-2'
          onClick={() => {
            handleGoBack()
          }}
        >
          <i class='fas fa-chevron-left'></i>
        </button>
        <div className='studio-heading'>
          <div className='leftSide'>
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
              {players.map((player) => (
                <img src='https://i.pravatar.cc' alt='playerava' className='playerAva' />
              ))}
            </div>
          </div>
        </div>
        {showForm && <FormAdd />}
      </div>
    </>
  )
}
