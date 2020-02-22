import React, { useEffect } from 'react'
import Track from './components/Track'
import { Howl, Howler } from 'howler'

import './style.css'

export default function Room() {
  const tracks = [
    'https://storage.googleapis.com/musichub/1901_gtr1.mp3',
    // 'https://storage.googleapis.com/musichub/1901_drumsleft.mp3',
    // 'https://storage.googleapis.com/musichub/1901_leadvox.mp3',
  ]
  useEffect(() => {}, [])
  return (
    <>
      <div className='card'>
        <div className='card-body'>
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
        </div>
      </div>
      <button onClick={() => {}}>Play All</button>
    </>
  )
}
