import getAccessToken from './get_access_token'
import decodeToken from './decode_token'

async function getDecodedAccessToken () {
  const accessToken = getAccessToken()
  const decodedAccessToken = accessToken && await decodeToken(accessToken)

  return decodedAccessToken
}

export default getDecodedAccessToken
