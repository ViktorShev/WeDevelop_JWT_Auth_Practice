import './SignInForm.scss'
import erorr_cross from '../../../img/error_cross.png'
import classNames from 'classnames'
import { loader } from 'graphql.macro'
import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setAccessToken } from 'services/authentication/access_token'


const LOGIN_USER_MUTATION = loader('../../graphql/signin.graphql')

export default function SignInForm(_) {
  const navigate = useNavigate()
  const [loginUser, { error }] = useMutation(
    LOGIN_USER_MUTATION,
    {
      onError: console.log,
      onCompleted: (data) => {
        setAccessToken(data.signin.jwt)
        navigate('/userinfo')
      }
    }
  )
  const [formState, setFormState] = useState({
    username: undefined,
    password: undefined
  })

  const showError = classNames('errorMessage', {'--show': error})
  const setAttr = (attr, e) => setFormState({ ...formState, [attr]: e.target.value })

  return (
    <>
      <form className='signInForm' onSubmit={(e) => {
        e.preventDefault();
        loginUser({ variables: { SigninInput: formState } })
        e.target.reset()
      }}>
        <h2>Member login</h2>
        <span className={showError}>Oh snap! Something went wrong.<img alt='x' src={erorr_cross}/></span>
        <input placeholder='Username' autoComplete='on' id='usernameInputField' onChange={ (e) => { setAttr('username', e) } }/>
        <input placeholder='Password' type='password' id='passwordInputField' onChange={ (e) => { setAttr('password', e) } }/>
        <input type='submit' id='submitLoginButton'/>
      </form>
      <a href='/auth/signup'>Do you not have an account?</a>
    </>
  )
}