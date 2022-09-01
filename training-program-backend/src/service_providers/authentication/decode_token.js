import jsonwebtoken from 'jsonwebtoken'

function decodeToken (token) {
  try {
    const decodedPayload = jsonwebtoken.verify(token, process.env.SECRET)

    return decodedPayload

  } catch (err) {

    return null
  }
}

export default decodeToken
