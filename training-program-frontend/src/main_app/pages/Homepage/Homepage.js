import PropTypes from "prop-types"
import './Homepage.scss'

function Homepage(props) {
  const { greetingName } = props
  return (
    <div className="greeting">
      <h1 className="greetingText">Hello {greetingName}!</h1>
      <div className="navigation">
        <button className="signupButton" onClick={() => {window.location.href='http://localhost:3000/auth/signup'}}>Sign up</button>
        <button className="signinButton" onClick={() => {window.location.href='http://localhost:3000/auth/signin'}}>Sign in</button>
      </div>
    </div>
  )
}

Homepage.propTypes = {
  greetingName: PropTypes.string
}

export default Homepage