let accessToken_ = null

export function setAccessToken (accessToken) {
  accessToken_ = accessToken
}

export default getAccessToken () {
  return accessToken_
}