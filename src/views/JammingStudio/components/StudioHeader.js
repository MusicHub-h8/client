import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import FormAdd from './FormAdd'

export default function StudioHeader() {
  const [showForm, setShowForm] = useState(false)
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
          {`< back`}
        </button>
        <div className='studio-heading'>
          <div className='leftSide'>
            <button
              className='dash-add-btn'
              onClick={(event) => {
                toggleForm()
              }}
            >
              Add Track
            </button>
          </div>
          <div className='rightSide'>test</div>
        </div>
        {showForm && <FormAdd />}
      </div>
    </>
  )
}
