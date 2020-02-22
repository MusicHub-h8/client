import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
export default function FormAdd() {
  const [instrument, setInstrument] = useState('')
  const dispatch = useDispatch()

  const handleFileUpload = (selectedFile) => {}
  const handleInstrumentInput = (input) => {
    setInstrument(input)
  }
  return (
    <form className='form-container'>
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
        />
        <label className='custom-file-label' for='customFile'>
          Add new Track
        </label>
      </div>
      <button className='dash-add-btn'>Submit</button>
    </form>
  )
}
