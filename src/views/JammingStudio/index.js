import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Howler } from 'howler'

import {
  requestRoomDetail,
  requestCurrentUser,
  triggerPlay,
  triggerPause,
  triggerStop,
  clearTracks,
  setActiveRoom,
} from '../../store/actions/'

import './style.css'

import ChatRoom from '../../components/ChatRoom'
import StudioHeader from './components/StudioHeader'
import Track from './components/Track'

export default function JammingStudio() {
  const socket = window.socket
  const { roomId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestRoomDetail(roomId))
  }, [dispatch, roomId])

  const roomDetail = useSelector((state) => state.roomReducer.activeRoom.detail)
  const tracks = useSelector((state) => state.roomReducer.activeRoom.tracks)
  const currentUser = useSelector((state) => state.userReducer.currentUser)

  const isPlaying = useSelector((state) => state.trackReducer.isPlaying)
  const isPaused = useSelector((state) => state.trackReducer.isPaused)
  const isStopped = useSelector((state) => state.trackReducer.isStopped)
  const loadedTracks = useSelector((state) => state.trackReducer.loadedTracks)

  const handlePlayButton = () => {
    dispatch(triggerPlay(!isPlaying))
  }
  const handleStopButton = () => {
    dispatch(triggerStop(!isStopped))
  }
  useEffect(() => {
    dispatch(requestCurrentUser())
    socket.on('new_person_enters', (room) => {
      if (room._id.toString() === roomId) {
        let newRoom = { detail: room, tracks }
        console.log(newRoom)
        dispatch(setActiveRoom(newRoom))
      }
      console.log(room)
    })
    return () => {
      Howler.unload()
      console.log('Jamming studio unmounted')
      dispatch(clearTracks())
    }
  }, [dispatch])

  const loadingBarContainerStyle = {
    width: '200%',
    height: '5px',
    marginBottom: '1rem',
    borderRadius: '3px',
    backgroundColor: 'lavender',
  }
  const [loadingBarProgress, setLoadingBarProgress] = useState({
    width: '0%',
    height: '100%',
    borderRadius: '3px',
    backgroundColor: 'lawngreen',
  })

  return (
    <>
      <div className='container-chatroom'>
        <ChatRoom currentUser={currentUser} roomId={roomId} roomDetail={roomDetail} />
      </div>
      <div className='studio'>
        <div className='studio-Container'>
          <div className='upper'>
            <StudioHeader roomDetail={roomDetail} />
            <div className='studio-Main'>
              <div className='trackContainer'>
                {tracks.map((track, i) => (
                  <Track key={i} instrument track={track} />
                ))}
              </div>
            </div>
          </div>

          {loadedTracks.length == tracks.length && loadedTracks.length !== 0 && (
            <div className='playback-container text-white'>
              <div className='playback-btnGroup'>
                <i
                  class={`fas fa-stop faBtn faBtnSmoll`}
                  onClick={() => {
                    handleStopButton()
                  }}
                ></i>
                <i
                  class={`fas faBtn playBtn ${
                    isPlaying ? 'faBtnActive fa-pause' : 'fa-play'
                  }`}
                  onClick={() => {
                    if (isPaused) {
                      handlePlayButton(false)
                    } else {
                      handlePlayButton(true)
                    }
                  }}
                ></i>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
