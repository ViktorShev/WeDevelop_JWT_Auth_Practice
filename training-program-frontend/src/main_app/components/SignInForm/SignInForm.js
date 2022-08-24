import './SignInForm.scss'


export default function SignInForm(props) {
  return (
    <>
      <form className='signInForm'>
        <h2>Member login</h2>
        <input placeholder='Username' autoComplete='on' id='usernameInputField' />
        <input placeholder='Password' type='password' id='passwordInputField' />
        <input type='submit' id='submitLoginButton'/>
      </form>
      <a href='/auth/signup'>Do you not have an account?</a>
    </>
  )
}