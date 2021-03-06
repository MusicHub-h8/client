import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SocketIOFileUpload from 'socketio-file-upload'
import { Base64 } from 'js-base64'

import { requestAddTrack } from '../../../store/actions'
import Dropdown from 'react-bootstrap/Dropdown'

export default function FormAdd() {
  const roomDetail = useSelector((state) => state.roomReducer.activeRoom.detail)

  const uploader = new SocketIOFileUpload(window.socket)
  useEffect(() => {}, [])

  const [instrument, setInstrument] = useState('')
  const [selectedFile, setSelectedFile] = useState({})
  const [base64encodedFile, setBase64encodedFile] = useState()
  const dispatch = useDispatch()

  const handleFileUpload = async (selectedFile) => {
    setSelectedFile(selectedFile[0])
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    const file = selectedFile[0]
    setBase64encodedFile(await toBase64(file))
  }
  const handleInstrumentInput = (input) => {
    setInstrument(input)
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    // ORIGINAL FILEUPLOAD
    const roomId = roomDetail._id
    const trackInfo = {
      roomId,
      instrument,
      base64encodedFile,
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
      <Dropdown>
        <Dropdown.Toggle variant='info' id='dropdown-basic'>
          {instrument.charAt(0).toUpperCase() + instrument.slice(1)}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleInstrumentInput('guitar')}>
            Guitar
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleInstrumentInput('bass')}>
            Bass
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleInstrumentInput('drum')}>
            Drum
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleInstrumentInput('piano')}>
            Piano
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleInstrumentInput('keyboard')}>
            Keyboard
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleInstrumentInput('vocal')}>
            Vocal
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleInstrumentInput('violin')}>
            Violin
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleInstrumentInput('acapella')}>
            Acapella
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleInstrumentInput('saxophone')}>
            Saxophone
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* <input
        value={instrument}
        onChange={event => {
          handleInstrumentInput(event.target.value);
        }}
        className="form-control form-instrument"
        placeholder="instrument name"
      /> */}
      <div className='custom-file form-upload mr-2'>
        <input
          onChange={(event) => {
            handleFileUpload(event.target.files)
          }}
          type='file'
          id='siofu_input'
          className='custom-file-input'
          accept='.mp3'
        />
        <label className='custom-file-label'>
          {/* upload track */}
          {selectedFile.name ? selectedFile.name : 'add track'}
        </label>
      </div>
      <input type='Submit' id='uploadSubmit' className='dash-add-btn' />
    </form>
  )
}
