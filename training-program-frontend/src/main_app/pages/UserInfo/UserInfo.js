import { useCurrentUser } from 'main_app/hooks/useCurrentUser'
import './UserInfo.scss'


export default function UserInfo () {
  const { isLoggedIn, userInfo } = useCurrentUser()
  
  if (!isLoggedIn) {
    return (
      <div className='notLoggedInContent'>
        <span className='mustBeLoggedInError'>Must be logged in!</span>
        <div className='actions'>
          <button className='signupButton' onClick={() => {window.location.href='http://localhost:3000/auth/signup'}}>Sign up</button>
          <button className='signinButton' onClick={() => {window.location.href='http://localhost:3000/auth/signin'}}>Sign in</button>
        </div>
      </div>
    )
  }

  return (
    <div className='userInfo'>
      <span>Your username is: {userInfo?.username}</span>
      <span>Your ID is: {userInfo?.id}</span>
      <hr />
      <button onClick={() => {window.location.href='/'}}>Back to homepage</button>
    </div>
  )
}