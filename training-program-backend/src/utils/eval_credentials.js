import { scryptSync } from 'crypto'

export function hashPassword(password, salt) {
  if (!password || !salt) {
    return ''
  }
  
  return scryptSync(password, salt, 64).toString('hex')
}

export function doHashesMatch(hash, comparisonHash) {
  return hash === comparisonHash
}