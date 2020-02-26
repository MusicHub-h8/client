import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { requestCurrentUser, setLoadingUser } from '../../../store/actions'
import NotificationCard from '../components/NotificationCard'
import Loading from './Loading'

const Notifications = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.userReducer.currentUser)
  const loading = useSelector((state) => state.userReducer.loading)
  const error = useSelector((state) => state.userReducer.error)
  console.log(currentUser, 'currentUser')

  useEffect(() => {
    dispatch(setLoadingUser(true))
    dispatch(requestCurrentUser())
  }, [dispatch])

  if (loading) return <Loading />
  if (error) return <p className='text-center mt-5'>Error...</p>

  const pendingList = () => {
    console.log(currentUser.pendingInvites, '<<<<<< ini pending invites dari currentUser')
    if (currentUser) {
      if (currentUser.pendingInvites.length > 0) {
        return currentUser.pendingInvites.map((pending) => (
          <NotificationCard key={pending} userId={currentUser._id} pending={pending} />
        ))
      }
    }
    return null
  }

  return pendingList()
}

export default Notifications
