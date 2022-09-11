import { useNavigate } from 'react-router-dom'

import { useCurrentUser } from 'main_app/hooks/useCurrentUser'
import './UserInfo.scss'


export default function UserInfo () {
  const { isLoggedIn, userInfo } = useCurrentUser()
  const navigate = useNavigate()
  
  if (!isLoggedIn) {
    return (
      <div className='notLoggedInContent'>
        <span className='mustBeLoggedInError'>Must be logged in!</span>
        <div className='actions'>
          <button className='signupButton' onClick={() => {navigate('/auth/signup')}}>Sign up</button>
          <button className='signinButton' onClick={() => {navigate('/auth/signin')}}>Sign in</button>
        </div>
      </div>
    )
  }

  return (
    <div className='userInfo'>
      <span>Your username is: {userInfo?.username}</span>
      <span>Your ID is: {userInfo?.id}</span>
      <hr />
      <button onClick={() => {navigate('/')}}>Back to homepage</button>
    </div>
  )
}