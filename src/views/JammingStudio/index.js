import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { requestRoomDetail } from '../../store/actions/'

import StudioHeader from './components/StudioHeader'
import Track from './components/Track'

import { Howl, Howler } from 'howler'

import './style.css'
import PlaybackControl from './components/PlaybackControl'

export default function JammingStudio() {
  const { roomId } = useParams()
  const dispatch = useDispatch()
  const tracks = [
    'https://storage.googleapis.com/musichub/1901_gtr1.mp3',
    'https://storage.googleapis.com/musichub/1901_drumsleft.mp3',
    // 'https://storage.googleapis.com/musichub/1901_leadvox.mp3',
  ]
  useEffect(() => {
    console.log(roomId)
    dispatch(requestRoomDetail(roomId))
  }, [])

  return (
    <div className='studio-Container'>
      <div className='upper'>
        <StudioHeader />
        <div className='studio-Main'>
          {tracks.map((track, i) => (
            <Track
              key={i}
              track={
                new Howl({
                  src: [track],
                })
              }
            />
          ))}
          <button onClick={() => {}}>Play All</button>
        </div>
      </div>
      <PlaybackControl />
    </div>
  )
}
