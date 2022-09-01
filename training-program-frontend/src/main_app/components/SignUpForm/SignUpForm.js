import './SignUpForm.scss'
import error_cross from '../../img/error_cross.png'
import classNames from 'classnames'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setAccessToken } from 'services/authentication/access_token'


const CREATE_USER_MUTATION = loader('../../graphql/signup.graphql')
const LOGIN_USER_MUTATION = loader('../../graphql/signin.graphql')

export default function SignUpForm() {
  const navigate = useNavigate()
  const [createUser, { error }] = useMutation(CREATE_USER_MUTATION, { onError: console.log })
  const [loginUser] = useMutation(LOGIN_USER_MUTATION, 
    { 
      onError: console.log, 
      onCompleted: (data) => {
        setAccessToken(data.signin.jwt)
        navigate('/userinfo')
      }
    })
    
  const [formState, setFormState] = useState({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    username: undefined,
    password: undefined
  })

  const showError = classNames('errorMessage', {'--show': error})
  const setAttr = (attr, e) => setFormState({ ...formState, [attr]: e.target.value })

  return (
    <>
      <form className='signUpForm' onSubmit={async (e) => {
        e.preventDefault();
        await createUser({ variables: { SignupInput: formState } })
        await loginUser({ variables: { SigninInput: { username: formState.username, password: formState.password }} })
        e.target.reset()
      }}>
        <h2>Member registration</h2>
        <span className={showError}>Oh snap! Something went wrong. <img alt='x' src={error_cross}/></span>
        <input placeholder='First name' autoComplete='on' id='firstNameInputField' onChange={ (e) => {setAttr('firstName', e)} }/>
        <input placeholder='Last name' autoComplete='on' id='lastNameInputField' onChange={ (e) => {setAttr('lastName', e)} }/>
        <input placeholder='Email' autoComplete='on' id='emailInputField' onChange={ (e) => {setAttr('email', e)} } />
        <input placeholder='Username' autoComplete='on' id='usernameInputField' onChange={ (e) => {setAttr('username', e)} }/>
        <input placeholder='Password' type='password' id='passwordInputField' onChange={ (e) => {setAttr('password', e)} }/>
        <input type='submit' id='submitRegistrationButton'/>
      </form>
      <a href='/auth/signin'>Do you already have an account?</a>
    </>
  )
}