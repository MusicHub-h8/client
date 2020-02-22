import React, { useState, useEffect } from 'react'
import { Howl, Howler } from 'howler'
import './style.css'

export default function Track({ audioUrl, track }) {
  const [volume, setVolume] = useState(75)
  const [isMuted, setMuted] = useState(false)
  const [panning, setPanning] = useState(50)
  const [seek, setSeek] = useState(0)

  const [audio, setAudio] = useState(
    // new Howl({
    //   src: [audioUrl],
    //   onplay: () => {
    //     console.log(audioUrl, 'is playing')
    //   },
    // })
    track
  )

  useEffect(() => {
    audio.on('load', () => {
      console.log(audio)
      audio.play()
      console.log(audio.duration())
      console.log(audio.seek())
    })
  }, [])

  // seekbar
  useEffect(() => {
    setInterval(() => {
      console.log((audio.seek() / audio.duration()) * 100)
    }, 500)
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

  return (
    <div>
      <div className='buttonsContainer'>
        <button
          onClick={(event) => {
            toggleMute()
          }}
        >
          mute
        </button>
      </div>
      <div className='volumeContainer'>
        <input
          className='volume-bar'
          type='range'
          value={volume}
          onChange={(event) => {
            handleVolumeChange(event.target.value)
          }}
        />
        <span>{volume}</span>
      </div>
      <div className='panContainer'>
        <input
          className='pan-bar'
          type='range'
          value={panning}
          onChange={(event) => {
            handlePanBar(event.target.value)
          }}
        />
        <span>{panning}</span>
      </div>

      <div className='progress' style={{ height: '3px' }}>
        <div
          className='progress-bar'
          role='progressbar'
          style={{ width: `${50}%` }}
          aria-valuenow='25'
          aria-valuemin='0'
          aria-valuemax='100'
        ></div>
      </div>
    </div>
  )
}
