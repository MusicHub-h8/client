import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { requestAddRoom } from '../../../store/actions'

const AddStudioForm = (props) => {
  const dispatch = useDispatch()
  const [musicTitle, setMusicTitle] = useState('')
  const [description, setDescription] = useState('')

  const onSubmitAddStudio = (event) => {
    event.preventDefault()
    const access_token = localStorage.getItem('access_token')
    setMusicTitle('')
    setDescription('')
    props.handleShowForm()
    dispatch(
      requestAddRoom({
        music_title: musicTitle,
        description,
        access_token,
      })
    )
  }

  const handleChangeMusicTitle = (event) => {
    setMusicTitle(event.target.value)
  }

  const handleChangeDescription = (event) => {
    setDescription(event.target.value)
  }

  return (
    <div className='add-studio-form'>
      <span
        className='cursor-pointer cancel-form'
        style={{ alignSelf: 'flex-end' }}
        onClick={props.handleShowForm}
      >
        Cancel
      </span>
      <h1>Add Studio</h1>
      <div className='add-studio-inside'>
        <form action='POST' onSubmit={onSubmitAddStudio}>
          <div className='input-field'>
            <input
              autoComplete='off'
              id='musicTitle'
              className='input-form'
              type='text'
              onChange={handleChangeMusicTitle}
              value={musicTitle}
              required
            />
            <label htmlFor='musicTitle'>Enter studio name</label>
            <span></span>
          </div>
          <br />
          <div className='input-field'>
            <input
              autoComplete='off'
              id='description'
              className='input-form'
              type='text'
              onChange={handleChangeDescription}
              value={description}
              required
            />
            <label htmlFor='description'>Enter studio description</label>
            <span></span>
          </div>
          <br />
          <input className='dash-add-btn' type='submit' value='Add Studio' />
        </form>
      </div>
    </div>
  )
}

export default AddStudioForm
