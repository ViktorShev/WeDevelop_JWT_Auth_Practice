export function logout () {
  localStorage.removeItem('token')
}

export function reloadPage () {
  window.location.reload()
}