import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { requestAddTrack } from '../../../store/actions'

export default function FormAdd() {
  const roomDetail = useSelector((state) => state.roomReducer.activeRoom.detail)

  const [instrument, setInstrument] = useState('')
  const [selectedFile, setSelectedFile] = useState({})
  const dispatch = useDispatch()

  const handleFileUpload = (selectedFile) => {
    setSelectedFile(selectedFile[0])
  }
  const handleInstrumentInput = (input) => {
    setInstrument(input)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('fired dari event submit')
    const roomId = roomDetail._id
    const trackInfo = {
      roomId,
      instrument,
      selectedFile,
    }
    dispatch(requestAddTrack(trackInfo))
  }
  return (
    <form
      className='form-container'
      onSubmit={(event) => {
        handleSubmit(event)
      }}
    >
      <input
        value={instrument}
        onChange={(event) => {
          handleInstrumentInput(event.target.value)
        }}
        className='form-control form-instrument'
        placeholder='instrument name'
      />
      <div className='custom-file form-upload mr-2'>
        <input
          onChange={(event) => {
            handleFileUpload(event.target.files)
          }}
          type='file'
          className='custom-file-input'
          id='customFile'
          accept='.mp3, .mp4, .ogg, .wav, .flac'
        />
        <label className='custom-file-label'>
          {selectedFile.name ? selectedFile.name : 'add track'}
        </label>
      </div>
      <input type='Submit' className='dash-add-btn' />
    </form>
  )
}
