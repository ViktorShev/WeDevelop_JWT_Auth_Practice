import './SignUpForm.scss'


export default function SignUpForm(props) {
  return (
    <>
      <form className='signUpForm'>
        <h2>Member registration</h2>
        <input placeholder='First name' autoComplete='on' id='firstNameInputField' />
        <input placeholder='Last name' autoComplete='on' id='lastNameInputField' />
        <input placeholder='Username' autoComplete='on' id='usernameInputField' />
        <input placeholder='Password' type='password' id='passwordInputField' />
        <input type='submit' id='submitRegistrationButton'/>
      </form>
      <a href='/auth/signin'>Do you already have an account?</a>
    </>
  )
}