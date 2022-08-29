import { loader } from 'graphql.macro'
import { ApolloProvider, useQuery } from '@apollo/client'
import client from 'services/graphql/client'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Homepage from './pages/Homepage';

const currentUserQuery = loader('./graphql/currentUser.graphql')

function App () {
  const { loading, error, data } = useQuery(currentUserQuery, { client })

  console.log(loading, error, data)

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage greetingName='Stranger'/>}/>
          <Route path='/auth/signup' element={<SignUpForm />}/>
          <Route path='/auth/signin' element={<SignInForm />}/>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
