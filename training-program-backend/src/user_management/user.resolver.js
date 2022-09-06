import jsonwebtoken from 'jsonwebtoken'

import models from '~/src/service_providers/sequelize/models'
import getDecodedAccessToken from '../service_providers/authentication/get_decoded_access_token'
import { doHashesMatch, hashPassword } from '../utils/eval_credentials'


export default {
    Mutation: {
      signup: async (obj, { data }, context, info) => {
        try {
          const user = await models.user.create(data)

        return {
          user: user,
          jwt: null,
          authError: null,
        }
      } catch (err) {
        throw new Error('USER_CREATE_FAIL')
      }
    },

    signin: async (obj, { data }, context, info) => {
      try {
        const user = await models.user.findOne({ where: { username: data.username } })
        const hashedUserProvidedPassword = hashPassword(data.password, user?.salt)
        if (doHashesMatch(user?.password, hashedUserProvidedPassword)) {
          const jwt = jsonwebtoken.sign({sub: user.id, name: user.lastName}, process.env.SECRET, {expiresIn: '10d'})
          return {
            user,
            jwt,
            authError: null
          }
        }
      } catch (err) {
        throw new Error('USER_LOGIN_FAIL')
      }  
      // return {
      //   user: null,
      //   jwt: null,
      //   authError: 'USER_LOGIN_FAIL'
      // }
    }
  },

  Query: {
    currentUser: async (obj, args, context, info) => {
      const decodedPayload = await getDecodedAccessToken()
      if (decodedPayload) {
        const user = await models.user.findOne({ where: { id: decodedPayload?.sub } })
        return {
          ...user.get()
        }
      }
      
      return (
        null
      )
    }
  }
}
