import React from 'react'

export default function FormAdd() {
  return (
    <form className='form-container'>
      <input className='form-control form-instrument' placeholder='instrument name' />
      <div className='custom-file form-upload mr-2'>
        <input type='file' className='custom-file-input' id='customFile' />
        <label className='custom-file-label' for='customFile'>
          Add new Track
        </label>
      </div>
      <button className='dash-add-btn'>Submit</button>
    </form>
  )
}
