import { loader } from 'graphql.macro'
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import client from '../../services/graphql/client'


const currentUserQuery = loader('../graphql/currentUser.graphql')

export function useCurrentUser() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { loading, data } = useQuery(currentUserQuery, { client, fetchPolicy: 'cache-and-network', nextFetchPolicy: 'cache-and-network' })

  useEffect(() => {
    if (!loading && data?.currentUser?.username !== undefined) {
      setIsLoggedIn(true)
    }
  }, [loading, data])

  return {
    isLoggedIn, 
    loading,
    userInfo: data?.currentUser
  }

}