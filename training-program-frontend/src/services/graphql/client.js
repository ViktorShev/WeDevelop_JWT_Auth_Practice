// TODO setup Apollo Client
import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { setContext } from "@apollo/client/link/context"
import { onError } from '@apollo/client/link/error';
import { getAccessToken } from 'services/authentication/access_token';


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken()

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:3001/graphql' })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, authLink, httpLink])
})

export default client