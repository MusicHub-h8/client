import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { requestDeleteTrack, removeTrack } from '../../../store/actions'
import { Howl, Howler } from 'howler'

import 'rc-slider/assets/index.css'
import './style.css'

import Slider from 'rc-slider'

export default function Track({ audioUrl, track }) {
  const dispatch = useDispatch()
  const [volume, setVolume] = useState(75)
  const [isMuted, setMuted] = useState(false)
  const [panning, setPanning] = useState(50)
  const [seek, setSeek] = useState(0)

  const [audio, setAudio] = useState(
    new Howl({
      src: [track.file_path],
      onplay: () => {
        console.log(track.file_path, 'is playing')
      },
    })
  )

  useEffect(() => {
    audio.on('load', () => {
      // console.log(audio)
      // audio.play()
      // console.log(audio.duration())
      // console.log(audio.seek())
    })
    return () => {
      audio.stop()
    }
  }, [])

  function toggleMute() {
    setMuted(!isMuted)
    console.log(audio.volume)
    if (isMuted) {
      audio.volume(volume / 100)
    } else {
      audio.volume(0)
    }
  }

  function handleVolumeChange(volume) {
    audio.volume(volume / 100)
    setVolume(volume)
  }

  // pan the track to right or left channel
  function handlePanBar(panSliderValue) {
    const panValue = (panSliderValue - 50) / 50
    setPanning(panSliderValue)
    audio.stereo(panValue)
  }

  const sliderStyle = {
    height: 300,
  }
  const trackStyle = [
    {
      backgroundColor: '#f3005d',
    },
  ]
  const handleStyle = [
    {
      // width: '30px',
      // height: '30px',
    },
  ]
  const railStyle = {
    backgroundColor: '#72a8be',
  }

  const handleDelete = () => {
    dispatch(requestDeleteTrack(track._id))
  }

  return (
    <div className='track'>
      <div className='track-label text-white'>
        <span>{track.instrument}</span>
        <i
          class='fas fa-trash removeIcon'
          onClick={() => {
            handleDelete()
          }}
        ></i>
      </div>

      <div className='volume-container text-white'>
        <div style={sliderStyle}>
          <Slider
            vertical
            onChange={handleVolumeChange}
            defaultValue={75}
            trackStyle={trackStyle}
            handleStyle={handleStyle}
            railStyle={railStyle}
          />
        </div>
      </div>

      <div className='panning-container text-white'>
        <span>{`${volume}%`}</span>
        <div className='track-btn-group'>
          <div
            className={isMuted ? 'track-btn track-btn-active' : 'track-btn'}
            onClick={(event) => {
              toggleMute()
            }}
          >
            <span>M</span>
          </div>
          <div
            className='track-btn'
            onClick={(event) => {
              toggleMute()
            }}
          >
            <span>S</span>
          </div>
        </div>
        <Slider
          included={false}
          onChange={handlePanBar}
          defaultValue={50}
          trackStyle={trackStyle}
          handleStyle={handleStyle}
          railStyle={railStyle}
        />
      </div>
    </div>
  )
}
