/* istanbul ignore file */

import { existsSync } from 'fs'

if (process.env.NODE_ENV === 'production') {
  if (existsSync('./dist')) {
    process.chdir('./dist')
  } else {
    console.warn(new Error('The "dist" folder was not found in the current directory.'))
  }
}
