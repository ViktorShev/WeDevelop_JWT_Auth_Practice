import { ApolloProvider } from '@apollo/client'
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCurrentUser } from './hooks/useCurrentUser';

import client from 'services/graphql/client';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import UserInfo from './pages/UserInfo/UserInfo'
import Homepage from './pages/Homepage/Homepage';


function App () {
  const { userInfo, loading } = useCurrentUser()
  const [greetingName, setGreetingName] = useState('stranger')

  useEffect(() => {
    if (userInfo !== undefined && userInfo !== null) {
      setGreetingName(userInfo.username)
    }
  }, [userInfo])

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage greetingName={greetingName} />}/>
          <Route path='/auth/signup' element={<SignUpForm />}/>
          <Route path='/auth/signin' element={<SignInForm />}/>
          <Route path='/userinfo' element={<UserInfo />}/>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
