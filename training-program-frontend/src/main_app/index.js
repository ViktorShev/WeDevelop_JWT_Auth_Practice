import { loader } from 'graphql.macro'
import { ApolloProvider, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react';
import client from 'services/graphql/client'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import UserInfo from './pages/UserInfo/UserInfo'
import Homepage from './pages/Homepage/Homepage';

const currentUserQuery = loader('./graphql/currentUser.graphql')

function App () {
  const { loading, data } = useQuery(currentUserQuery, { client })
  const [greetingName, setGreetingName] = useState('stranger')

  useEffect(() => {
    if (!loading && data?.currentUser?.username !== undefined) {
      setGreetingName(data.currentUser.username)
    }
  }, [loading, data])

  if (loading) {
    return (
      <h1>Loading...</h1>
    )
  }
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage greetingName={greetingName}/>}/>
          <Route path='/auth/signup' element={<SignUpForm />}/>
          <Route path='/auth/signin' element={<SignInForm />}/>
          <Route path='/userinfo' element={<UserInfo/>}/>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
