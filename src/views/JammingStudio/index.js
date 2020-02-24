import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { requestRoomDetail, requestCurrentUser } from '../../store/actions/'

import './style.css'

import ChatRoom from '../../components/ChatRoom'
import StudioHeader from './components/StudioHeader'
import Track from './components/Track'
import PlaybackControl from './components/PlaybackControl'

export default function JammingStudio() {
  const { roomId } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestCurrentUser())
  }, [])

  useEffect(() => {
    dispatch(requestRoomDetail(roomId))
  }, [dispatch, roomId])

  const roomDetail = useSelector((state) => state.roomReducer.activeRoom.detail)
  const tracks = useSelector((state) => state.roomReducer.activeRoom.tracks)
  const currentUser = useSelector((state) => state.userReducer.currentUser)

  return (
    <div className='studio'>
      <ChatRoom currentUser={currentUser} roomId={roomId} roomDetail={roomDetail} />
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
        <PlaybackControl />
      </div>
    </div>
  )
}
