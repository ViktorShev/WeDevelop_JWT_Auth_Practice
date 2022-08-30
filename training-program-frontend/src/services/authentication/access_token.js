export function setAccessToken (accessToken) {
  localStorage.setItem('token', accessToken)
}

export function getAccessToken () {
  return localStorage.getItem('token')
}