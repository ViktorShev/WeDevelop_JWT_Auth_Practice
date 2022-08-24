import setAccessToken from '~/src/service_providers/authentication/set_access_token'
import getRequestHeader from '~/src/service_providers/http/get_request_header'

export default (req, res, next) => {
  const authorizationHeaderValue = getRequestHeader('Authorization')

  // TODO: extract the token from the Authorization header value
  const token = ''

  setAccessToken(token)
  next()
}
