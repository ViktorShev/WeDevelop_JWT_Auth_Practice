import { loader } from 'graphql.macro'
import { useQuery } from '@apollo/client'

import client from 'services/graphql/client'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';

const exampleQuery = loader('./graphql/currentUser.graphql')

function App () {
  const { loading, error, data } = useQuery(exampleQuery, { client })

  console.log(loading, error, data)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth/signup' element={<SignUpForm />}/>
        <Route path='/auth/signin' element={<SignInForm />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
