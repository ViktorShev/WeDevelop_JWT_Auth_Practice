import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

import { logout, reloadPage } from 'main_app/utils/logout_user'
import './Homepage.scss'
import { useCurrentUser } from 'main_app/hooks/useCurrentUser'


function Homepage(props) {
  const { 
    greetingName, 
  } = props

  const { 
    isLoggedIn 
  } = useCurrentUser()

  const navigate = useNavigate()
  
  const shouldDisableLogout = classNames('logout', {'--disabled': !isLoggedIn})
  const shouldDisableInfo = classNames('goToInfoButton', {'--disabled': !isLoggedIn})
  const shouldDisableSignup = classNames('signupButton', {'--disabled': isLoggedIn})
  const shouldDisableSigin = classNames('signinButton', {'--disabled': isLoggedIn})

  return (
    <div className="greeting">
      <h1 className="greetingText">Hello {greetingName}!</h1>
    <div className="actions">
      <button className={shouldDisableSignup} onClick={() => {navigate('/auth/signup')}}>Sign up</button>
      <button className={shouldDisableSigin} onClick={() => {navigate('/auth/signin')}}>Sign in</button>
      <button className={shouldDisableInfo} onClick={() => {navigate('/userinfo')}}>Your info</button>
      <button className={shouldDisableLogout} onClick={() => {logout(); reloadPage()}}>Logout</button>
    </div>
    </div>
  )
}

Homepage.propTypes = {
  greetingName: PropTypes.string,
}

export default Homepage