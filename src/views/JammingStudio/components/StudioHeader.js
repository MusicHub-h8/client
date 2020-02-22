import React from 'react'
import { useHistory } from 'react-router-dom'
import FormAdd from './FormAdd'

export default function StudioHeader() {
  const history = useHistory()

  const handleGoBack = () => {
    history.goBack()
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
            <button className='dash-add-btn'>Add Track</button>
          </div>
          <div className='rightSide'>test</div>
        </div>
        <FormAdd />
      </div>
    </>
  )
}
